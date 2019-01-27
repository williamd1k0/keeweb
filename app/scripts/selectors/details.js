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
