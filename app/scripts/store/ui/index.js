import * as init from './init';
import * as setView from './set-view';
import * as setAlert from './alerts/set-alert';
import * as removeAlert from './alerts/remove-alert';
import * as addKeyShortcut from './keys/add-key-shortcut';
import * as removeKeyShortcut from './keys/remove-key-shortcut';

export const UiViewOpen = 'open';
export const UiViewSettings = 'settings';

export const ShortcutAction = 1;
export const ShortcutOpt = 2;

export default {
    init,
    setView,
    setAlert,
    removeAlert,
    addKeyShortcut,
    removeKeyShortcut,
};
