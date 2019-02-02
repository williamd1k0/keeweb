import { createSelector } from 'reselect';
import { Links } from 'const/links';
import { getAppInfo } from 'selectors/env';

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

export const getCreateIssueLink = createSelector(
    [getAppInfo],
    appInfo => {
        return (
            Links.Repo +
            '/issues/new?body=' +
            encodeURIComponent('!please describe your issue here!\n\n' + appInfo)
        );
    }
);
