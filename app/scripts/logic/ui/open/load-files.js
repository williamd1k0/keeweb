import kdbxweb from 'kdbxweb';
import { showAlert } from 'logic/ui/alert/show-alert';
import { displayFile } from 'store/ui/open/display-file';
import { displayKeyFile } from 'store/ui/open/display-key-file';
import { uuid } from 'util/generators/id-generator';

export function loadFileContent(file) {
    return (dispatch, getState) => {
        const state = getState();
        if (state.uiOpen.busy) {
            return Promise.resolve();
        }
        return loadFile(file)
            .then(data => {
                const isValid = checkFileFormat(data);
                if (!isValid) {
                    return;
                }
                const fileInfo = {
                    id: uuid(),
                    name: file.name.replace(/(.+)\.\w+$/i, '$1'),
                    path: file.path || null,
                    storage: file.path ? 'file' : null,
                    data: data,
                    rev: null,
                };
                // TODO: showLocalFileAlert
                return dispatch(displayFile(fileInfo));
            })
            .catch(() => {
                dispatch(showAlert({ header: 'openFailedRead' }));
            });

        function checkFileFormat(fileData) {
            const fileSig = fileData.byteLength < 8 ? null : new Uint32Array(fileData, 0, 2);
            if (!fileSig || fileSig[0] !== kdbxweb.Consts.Signatures.FileMagic) {
                dispatch(showAlert({ header: 'openWrongFile', body: 'openWrongFileBody' }));
                return false;
            }
            if (fileSig[1] === kdbxweb.Consts.Signatures.Sig2Kdb) {
                dispatch(showAlert({ header: 'openWrongFile', body: 'openKdbFileBody' }));
                return false;
            }
            if (fileSig[1] !== kdbxweb.Consts.Signatures.Sig2Kdbx) {
                dispatch(showAlert({ header: 'openWrongFile', body: 'openWrongFileBody' }));
                return false;
            }
            return true;
        }
    };
}

export function loadKeyFileContent(file) {
    return (dispatch, getState) => {
        const state = getState();
        if (state.uiOpen.busy) {
            return Promise.resolve();
        }
        return loadFile(file)
            .then(data => {
                const keyFileInfo = {
                    id: uuid(),
                    name: file.name,
                    data: data,
                };
                return dispatch(displayKeyFile(keyFileInfo));
            })
            .catch(() => {
                dispatch(showAlert({ header: 'openFailedRead' }));
            });
    };
}

function loadFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
            const data = e.target.result;
            resolve(data);
        };
        reader.onerror = () => {
            reject();
        };
        reader.readAsArrayBuffer(file);
    });
}
