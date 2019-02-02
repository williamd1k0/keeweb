import { createSelector } from 'reselect';

const getActiveMenuItemId = state => state.menu.settings.active;
const getFilesById = state => state.files.byId;

export const getSelectedFile = createSelector(
    [getActiveMenuItemId, getFilesById],
    (menuItemId, filesById) => {
        if (menuItemId.startsWith('file')) {
            const fileId = menuItemId.split('.')[1];
            return filesById[fileId];
        }
        return undefined;
    }
);
