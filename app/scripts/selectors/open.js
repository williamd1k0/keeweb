import { createSelector } from 'reselect';

const getSettings = state => state.settings;
const getRuntime = state => state.runtime;

export const getOpenRows = createSelector(
    [getSettings, getRuntime],
    (settings, runtime) => {
        const firstRow = [];
        const secondRow = [];

        if (settings.canOpen) {
            firstRow.push({ id: 'open', icon: 'lock', res: 'openOpen' });
        }
        if (settings.canCreate) {
            firstRow.push({ id: 'new', icon: 'plus', res: 'openNew' });
        }
        if (settings.canOpenDemo && !runtime.demoOpened) {
            firstRow.push({ id: 'demo', icon: 'magic', res: 'openDemo' });
        }
        if (!firstRow.length && !secondRow.length) {
            firstRow.push({ id: 'icon', icon: 'key', text: 'KeeWeb' });
        }

        if (settings.canImportXml) {
            secondRow.push({ id: 'import-xml', icon: 'code', res: 'openXml' });
        }
        if (settings.canOpenDemo && runtime.demoOpened) {
            secondRow.push({ id: 'demo', icon: 'magic', res: 'openDemo' });
        }
        if (settings.canOpenSettings) {
            secondRow.push({ id: 'settings', icon: 'cog', res: 'settings' });
        }

        if (secondRow.length) {
            if (secondRow.length === 1) {
                firstRow.push(...secondRow);
                secondRow.length = 0;
            }
        }

        return {
            firstRow,
            secondRow,
        };
    }
);
