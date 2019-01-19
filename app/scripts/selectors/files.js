import { Storage } from 'storage';
import { createSelector } from 'reselect';
import { getStorageProviderNames } from 'selectors/storage';

const getLastFileIds = state => state.files.last;
const getActiveFileIds = state => state.files.active;
const getFilesById = state => state.files.byId;

export const getLastFiles = createSelector(
    [getLastFileIds, getFilesById, getStorageProviderNames],
    (lastFileIds, filesById, storageProviderNames) => {
        return lastFileIds
            .map(id => {
                const file = Object.assign({}, filesById[id]);
                if (file.storage) {
                    if (!storageProviderNames.includes(file.storage)) {
                        return false;
                    }
                    const storage = Storage[file.storage];
                    if (!storage) {
                        return false;
                    }
                    if (storage.icon) {
                        file.icon = storage.icon;
                    } else if (storage.iconSvg) {
                        file.iconSvg = storage.iconSvg;
                    } else {
                        file.icon = 'file-text';
                    }
                } else {
                    file.icon = 'file-text';
                }
                if (file.storage && ['file', 'webdav'].includes(file.storage)) {
                    file.displayedPath = file.path;
                }
                return file;
            })
            .filter(file => file);
    }
);

export const getActiveFiles = createSelector(
    [getActiveFileIds, getFilesById],
    (openFileIds, filesById) => {
        return openFileIds.map(id => filesById[id]).filter(file => file);
    }
);

export const hasActiveFiles = createSelector(
    [getActiveFileIds],
    openFileIds => {
        return openFileIds.length > 0;
    }
);

function getMatchParams(state, props) {
    return {
        id: props.id,
        storage: props.storage,
        path: props.path,
        name: props.name,
    };
}

export const getFile = createSelector(
    [getFilesById, getMatchParams],
    (filesById, matchParams) => {
        if (matchParams.id && filesById[matchParams.id]) {
            return filesById[matchParams.id];
        }
        return Object.values(filesById).find(
            file =>
                file.storage === matchParams.storage &&
                file.path === matchParams.path &&
                file.name === matchParams.name
        );
    }
);
