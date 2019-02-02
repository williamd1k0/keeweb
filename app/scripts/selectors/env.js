import { createSelector } from 'reselect';

const getEnv = state => state.env;

export const getActionShortcutSymbol = createSelector(
    [getEnv],
    env => {
        return env.isMac ? '⌘' : 'ctrl + ';
    }
);

export const getAltShortcutSymbol = createSelector(
    [getEnv],
    env => {
        return env.isMac ? '⌥' : 'alt + ';
    }
);

export const getGlobalShortcutSymbol = createSelector(
    [getEnv],
    env => {
        return env.isMac ? '⌃⌥' : 'shift+alt+';
    }
);
