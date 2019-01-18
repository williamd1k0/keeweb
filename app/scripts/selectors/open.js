import { Storage } from 'storage';
import { createSelector } from 'reselect';
import { getStorageProviderNames } from 'selectors/storage';

const getSettings = state => state.settings;

export const getOpenRows = createSelector(
    [getSettings, getStorageProviderNames],
    (settings, storageProviderNames) => {
        const first = [];
        const second = [];

        if (settings.canOpen) {
            first.push({ id: 'open', icon: 'lock', res: 'openOpen' });
        }
        if (settings.canCreate) {
            first.push({ id: 'new', icon: 'plus', res: 'openNew' });
        }
        if (settings.canOpenDemo && !settings.demoOpened) {
            first.push({ id: 'demo', icon: 'magic', res: 'openDemo' });
        }
        if (!first.length && !second.length) {
            first.push({ id: 'icon', icon: 'key', text: 'KeeWeb' });
        }

        for (const provider of storageProviderNames) {
            const storage = Storage[provider];
            second.push({
                id: provider,
                icon: storage.icon,
                iconSvg: storage.iconSvg,
                res: provider,
            });
        }

        if (settings.canImportXml) {
            second.push({ id: 'import-xml', icon: 'code', res: 'openXml' });
        }
        if (settings.canOpenDemo && settings.demoOpened) {
            second.push({ id: 'demo', icon: 'magic', res: 'openDemo' });
        }
        if (settings.canOpenSettings) {
            second.push({ id: 'settings', icon: 'cog', res: 'settings' });
        }

        if (second.length) {
            if (second.length === 1) {
                first.push(...second);
                second.length = 0;
            } else {
                first.push({ id: 'more', icon: 'ellipsis-h', res: 'openMore' });
            }
        }

        return {
            first,
            second,
        };
    }
);
