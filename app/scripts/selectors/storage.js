import { createSelector } from 'reselect';
import Storage from 'storage';

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
