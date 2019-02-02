import { createSelector } from 'reselect';
import { Launcher } from 'launcher';

const getEnv = state => state.env;

export const getAppInfo = createSelector(
    [getEnv],
    env => {
        return (
            `KeeWeb v${env.meta.version} (${env.meta.commit}, ${env.meta.buildDate})\n` +
            `Environment: ${Launcher ? Launcher.name : 'web'}\n` +
            `User-Agent: ${env.userAgent}`
        );
    }
);

export const getActionShortcutSymbol = createSelector(
    [getEnv],
    env => {
        return env.isMac ? '⌘' : 'ctrl+';
    }
);

export const getAltShortcutSymbol = createSelector(
    [getEnv],
    env => {
        return env.isMac ? '⌥' : 'alt+';
    }
);

export const getGlobalShortcutSymbol = createSelector(
    [getEnv],
    env => {
        return env.isMac ? '⌃⌥' : 'shift+alt+';
    }
);

export const globalShortcutTextIsLong = createSelector(
    [getEnv],
    env => {
        return !env.isMac;
    }
);
