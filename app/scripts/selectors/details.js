import { createSelector } from 'reselect';
import { getActiveItemId } from 'selectors/list';

const getFilesById = state => state.files.byId;

export const getActiveEntry = createSelector(
    [getFilesById, getActiveItemId],
    (filesById, activeItemId) => {
        if (!activeItemId) {
            return undefined;
        }
        const [fileId, entryUuid] = activeItemId.split('.');
        const file = filesById[fileId];
        if (!file || !file.entries) {
            return undefined;
        }
        return file.entries[entryUuid];
    }
);

export const getActiveGroup = createSelector(
    [getFilesById, getActiveEntry],
    (filesById, activeEntry) => {
        if (!activeEntry) {
            return undefined;
        }
        const file = filesById[activeEntry.fileId];
        if (!file || !file.groups) {
            return undefined;
        }
        return file.groups[activeEntry.parentUuid];
    }
);

export const getActiveFile = createSelector(
    [getFilesById, getActiveEntry],
    (filesById, activeEntry) => {
        if (!activeEntry) {
            return undefined;
        }
        return filesById[activeEntry.fileId];
    }
);
