import { createSelector } from 'reselect';

const getLastFileIds = state => state.files.last;
const getFilesById = state => state.files.byId;

export const getLastFiles = createSelector(
    [getLastFileIds, getFilesById],
    (lastFileIds, filesById) => {
        return lastFileIds.map(id => filesById[id]).filter(file => file);
    }
);
