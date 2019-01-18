import Storage from 'storage';
import { createSelector } from 'reselect';
import { getStorageProviderNames } from 'selectors/storage';

const getLastFileIds = state => state.files.last;
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
                return file;
            })
            .filter(file => file);
    }
);
