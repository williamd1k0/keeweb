import Storage from 'storage';
import { createSelector } from 'reselect';

const getSettings = state => state.settings;

export const getStorageProviders = createSelector(
    [getSettings],
    settings => {
        return Object.values(Storage)
            .filter(provider => !provider.system && provider.enabled)
            .map(provider => provider.name)
            .filter(name => settings[name]);
    }
);

export const getOpenRows = createSelector(
    [getSettings, getStorageProviders],
    (settings, storageProviders) => {
        const firstRow = [];
        const secondRow = [];

        if (settings.canOpen) {
            firstRow.push({ id: 'open', icon: 'lock', res: 'openOpen' });
        }
        if (settings.canCreate) {
            firstRow.push({ id: 'new', icon: 'plus', res: 'openNew' });
        }
        if (settings.canOpenDemo && !settings.demoOpened) {
            firstRow.push({ id: 'demo', icon: 'magic', res: 'openDemo' });
        }
        if (!firstRow.length && !secondRow.length) {
            firstRow.push({ id: 'icon', icon: 'key', text: 'KeeWeb' });
        }

        for (const provider of storageProviders) {
            const storage = Storage[provider];
            secondRow.push({
                id: provider,
                icon: storage.icon,
                iconSvg: storage.iconSvg,
                res: provider,
            });
        }

        if (settings.canImportXml) {
            secondRow.push({ id: 'import-xml', icon: 'code', res: 'openXml' });
        }
        if (settings.canOpenDemo && settings.demoOpened) {
            secondRow.push({ id: 'demo', icon: 'magic', res: 'openDemo' });
        }
        if (settings.canOpenSettings) {
            secondRow.push({ id: 'settings', icon: 'cog', res: 'settings' });
        }

        if (secondRow.length) {
            if (secondRow.length === 1) {
                firstRow.push(...secondRow);
                secondRow.length = 0;
            } else {
                firstRow.push({ id: 'more', icon: 'ellipsis-h', res: 'openMore' });
            }
        }

        return {
            firstRow,
            secondRow,
        };
    }
);
