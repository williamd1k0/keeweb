import { createSelector } from 'reselect';
import { Links } from 'const/links';
import { getAppInfo } from 'selectors/env';

const getLocale = state => state.locale;
const getActiveMenuItemId = state => state.menu.settings.active;
const getFilesById = state => state.files.byId;
const getSettings = state => state.settings;

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

export const getAllLocales = createSelector(
    [],
    () => {
        return [
            { id: 'en', text: 'English' },
            { id: 'de-DE', text: 'Deutsch' },
            { id: 'fr-FR', text: 'Français' },
        ];
    }
);

export const getActiveLocale = createSelector(
    [getSettings, getAllLocales],
    (settings, allLocales) => {
        let locale = settings.locale || 'en';
        if (!allLocales.some(loc => loc.id === locale)) {
            locale = 'en';
        }
        return locale;
    }
);

export const getAllThemes = createSelector(
    [getLocale],
    locale => {
        return [
            { id: 'fb', text: locale.setGenThemeFb },
            { id: 'db', text: locale.setGenThemeDb },
            { id: 'sd', text: locale.setGenThemeSd },
            { id: 'sl', text: locale.setGenThemeSl },
            { id: 'wh', text: locale.setGenThemeWh },
            { id: 'te', text: locale.setGenThemeTe },
            { id: 'hc', text: locale.setGenThemeHc },
        ];
    }
);

export const getActiveTheme = createSelector(
    [getSettings],
    settings => {
        return settings.theme;
    }
);

export const getFontSize = createSelector(
    [getSettings],
    settings => {
        return settings.fontSize || 0;
    }
);
