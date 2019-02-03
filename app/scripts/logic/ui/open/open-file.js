import kdbxweb from 'kdbxweb';
import DemoFileDataBase64 from 'base64-loader!resources/Demo.kdbx';
import { omit } from 'util/helpers/fn';
import { Logger } from 'util/logger';
import { setLoading } from 'store/ui/open/set-loading';
import { setOpenError } from 'store/ui/open/set-open-error';
import { resetOpenView } from 'store/ui/open/reset-open-view';
import { getFile } from 'selectors/files';
import { KdbxRepository } from 'api/kdbx-repository';
import { Storage } from 'storage';
import { showAlert } from 'logic/ui/alert/show-alert';
import { setFileProps } from 'store/files/set-file-props';
import { addLastFile } from 'store/files/add-last-file';
import { addActiveFile } from 'store/files/add-active-file';
import { saveLastFiles } from 'logic/files/save-last-files';
import { updateFileModel } from 'logic/files/update-file-model';
import { setView } from 'store/ui/set-view';
import { updateSettings } from 'logic/settings/update-settings';

const DemoFileId = '1c88acf9-197d-459c-8c0f-e74d67f2e0c3';

export function openFile(password) {
    return (dispatch, getState) => {
        const state = getState();
        if (state.uiOpen.busy) {
            return Promise.resolve();
        }
        const { file } = state.uiOpen;
        if (!file) {
            return;
        }
        return dispatch(openFileInternal(file, password));
    };
}

export function openDemo() {
    return (dispatch, getState) => {
        const state = getState();
        if (state.uiOpen.busy) {
            return Promise.resolve();
        }
        const data = kdbxweb.ByteUtils.arrayToBuffer(
            kdbxweb.ByteUtils.base64ToBytes(DemoFileDataBase64)
        );
        const file = {
            id: DemoFileId,
            name: 'Demo',
            demo: true,
            data,
        };
        const password = kdbxweb.ProtectedValue.fromString('demo');
        return dispatch(openFileInternal(file, password));
    };
}

function openFileInternal(file, password) {
    return (dispatch, getState) => {
        const state = getState();
        if (state.files.active.includes(file.id)) {
            dispatch(setView('list'));
            return Promise.resolve();
        }
        const params = {
            settings: { rememberKeyFiles: state.settings.rememberKeyFiles },
            password,
            ...file,
        };
        dispatch(setLoading('file'));
        return new Promise((resolve, reject) => {
            openFileWithCallback(params, state, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        })
            .then(({ file }) => {
                dispatch(resetOpenView());
                dispatch(setFileProps(file.id, file));
                if (!file.demo) {
                    dispatch(addLastFile(file.id));
                    dispatch(saveLastFiles());
                }
                dispatch(addActiveFile(file.id));
                dispatch(updateFileModel(file.id));
                dispatch(setView('list'));
                if (file.demo && !state.settings.demoOpened) {
                    dispatch(updateSettings({ demoOpened: true }));
                }
            })
            .catch(err => {
                dispatch(setLoading(undefined));
                if (err && err.code === kdbxweb.Consts.ErrorCodes.InvalidKey) {
                    dispatch(setOpenError('wrong-password'));
                } else {
                    const errorText = err.notFound ? 'openErrorFileNotFound' : err.toString();
                    dispatch(
                        showAlert({
                            header: 'openError',
                            body: 'openErrorDescription',
                            error: errorText,
                        })
                    );
                }
            });
    };
}

function openFileWithCallback(params, state, callback) {
    const logger = new Logger('open', params.name);
    logger.info('File open request');
    const file = getFile(state, {
        id: params.id,
        storage: params.storage,
        name: params.name,
        path: params.path,
    });
    if (!params.opts && file && file.opts) {
        params.opts = file.opts;
    }
    if (file && file.modified) {
        logger.info('Open file from cache because it is modified');
        openFileFromCache(
            params,
            (err, file) => {
                if (!err && file) {
                    logger.info('Sync just opened modified file');
                    setTimeout(() => syncFile(file), 0);
                }
                callback(err);
            },
            file
        );
    } else if (params.data) {
        logger.info('Open file from supplied content');
        const needSaveToCache = params.storage !== 'file' && !params.demo;
        openFileWithData(params, callback, file, params.data, needSaveToCache);
    } else if (!params.storage) {
        logger.info('Open file from cache as main storage');
        openFileFromCache(params, callback, file);
    } else if (file && file.openDate && file.rev === params.rev && file.storage !== 'file') {
        logger.info('Open file from cache because it is latest');
        openFileFromCache(params, callback, file);
    } else if (!file || !file.openDate || params.storage === 'file') {
        logger.info('Open file from storage', params.storage);
        const storage = Storage[params.storage];
        const storageLoad = () => {
            logger.info('Load from storage');
            storage.load(params.path, params.opts, (err, data, stat) => {
                if (err) {
                    if (file && file.openDate) {
                        logger.info('Open file from cache because of storage load error', err);
                        openFileFromCache(params, callback, file);
                    } else {
                        logger.info('Storage load error', err);
                        callback(err);
                    }
                } else {
                    logger.info('Open file from content loaded from storage');
                    params.data = data;
                    params.rev = (stat && stat.rev) || null;
                    const needSaveToCache = storage.name !== 'file';
                    openFileWithData(params, callback, file, data, needSaveToCache);
                }
            });
        };
        const cacheRev = (file && file.rev) || null;
        if (cacheRev && storage.stat) {
            logger.info('Stat file');
            storage.stat(params.path, params.opts, (err, stat) => {
                if (file && storage.name !== 'file' && (err || (stat && stat.rev === cacheRev))) {
                    logger.info(
                        'Open file from cache because ' + (err ? 'stat error' : 'it is latest'),
                        err
                    );
                    openFileFromCache(params, callback, file);
                } else if (stat) {
                    logger.info(
                        'Open file from storage (' + stat.rev + ', local ' + cacheRev + ')'
                    );
                    storageLoad();
                } else {
                    logger.info('Stat error', err);
                    callback(err);
                }
            });
        } else {
            storageLoad();
        }
    } else {
        logger.info('Open file from cache, will sync after load', params.storage);
        openFileFromCache(
            params,
            (err, file) => {
                if (!err && file) {
                    logger.info('Sync just opened file');
                    setTimeout(() => syncFile(file), 0);
                }
                callback(err);
            },
            file
        );
    }
}

function openFileFromCache(params, callback, file) {
    Storage.cache.load(params.id, null, (err, data) => {
        const logger = new Logger('open', params.name);
        if (!data) {
            err = 'File not found in cache';
        }
        if (err) {
            logger.error('Error loading file from cache', err);
        } else {
            logger.info('Loaded file from cache');
        }
        if (err) {
            callback(err);
        } else {
            openFileWithData(params, callback, file, data);
        }
    });
}

function openFileWithData(params, callback, file, data, updateCacheOnSuccess) {
    const logger = new Logger('open', params.name);
    let needLoadKeyFile = false;
    if (!params.keyFileData && file && file.keyFileName) {
        params.keyFileName = file.keyFileName;
        if (params.rememberKeyFiles === 'data') {
            params.keyFileData = kdbxweb.Credentials.createKeyFileWithHash(file.keyFileHash);
        } else if (params.rememberKeyFiles === 'path' && file.keyFilePath) {
            params.keyFilePath = file.get('keyFilePath');
            if (Storage.file.enabled) {
                needLoadKeyFile = true;
            }
        }
    } else if (params.keyFilePath && !params.keyFileData && !file) {
        needLoadKeyFile = true;
    }
    const openComplete = (kdbx, err) => {
        if (err) {
            logger.error('Error opening file', err);
            return callback(err);
        }
        const uuid = kdbx.getDefaultGroup().uuid.toString();
        if (file && file.modified && file.editState) {
            logger.info('Loaded local edit state');
            kdbx.setLocalEditState(file.editState);
        }
        if (updateCacheOnSuccess) {
            logger.info('Save loaded file to cache');
            Storage.cache.save(params.id, null, data);
        }
        let result = {
            ...params,
            ...file,
            uuid,
            rev: params.rev || (file && file.rev),
            open: true,
            version: 1,
        };
        const storage = params.storage;
        if (Storage[storage] && Storage[storage].storeOptsToFileOpts && params.opts) {
            result.fileOpts = Storage[storage].storeOptsToFileOpts(params.opts, file);
        }
        const ts = logger.ts();
        KdbxRepository.add(params.id, kdbx);
        logger.info(`Read file model in ${logger.ts(ts)}`);
        result = omit(result, ['settings', 'password', 'data', 'keyFileData']);
        callback(null, { file: result });
        // fileOpened(file, data, params); // TODO
        logger.info('File open complete');
    };
    const open = password => {
        const credentials = new kdbxweb.Credentials(password, params.keyFileData);
        const ts = logger.ts();
        kdbxweb.Kdbx.load(data, credentials)
            .then(kdbx => {
                if (params.keyFileData) {
                    kdbxweb.ByteUtils.zeroBuffer(params.keyFileData);
                }
                const lengthKb = Math.round(data.byteLength / 1024);
                const kdfStr = kdfArgsToString(kdbx.header);
                logger.info(
                    `Opened file ${params.name}: ${logger.ts(ts)}, ${kdfStr}, ${lengthKb}kB`
                );
                openComplete(kdbx);
            })
            .catch(err => {
                if (
                    err.code === kdbxweb.Consts.ErrorCodes.InvalidKey &&
                    password &&
                    !password.byteLength
                ) {
                    logger.info(
                        'Error opening file with empty password, try to open with null password'
                    );
                    return open(null);
                }
                logger.error('Error opening file', err.code, err.message, err);
                openComplete(null, err);
            });
    };
    if (needLoadKeyFile) {
        Storage.file.load(params.keyFilePath, {}, (err, data) => {
            if (err) {
                logger.info('Storage load error', err);
                callback(err);
            } else {
                params.keyFileData = data;
                open(params.password);
            }
        });
    } else {
        open(params.password);
    }
}

function kdfArgsToString(header) {
    if (header.kdfParameters) {
        return header.kdfParameters
            .keys()
            .map(key => {
                const val = header.kdfParameters.get(key);
                if (val instanceof ArrayBuffer) {
                    return;
                }
                return key + '=' + val;
            })
            .filter(p => p)
            .join('&');
    } else if (header.keyEncryptionRounds) {
        return header.keyEncryptionRounds + ' rounds';
    } else {
        return '?';
    }
}

function syncFile() {
    // TODO: sync
}
