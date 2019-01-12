import Keys from '../../const/keys';
import store from '../../store';
import IdleTracker from './idle-tracker';
import { ShortcutAction, ShortcutOpt } from '../../store/ui';
import addKeyShortcut from '../../store/ui/keys/add-key-shortcut';
import removeKeyShortcut from '../../store/ui/keys/remove-key-shortcut';

const shortcutKeyProp = navigator.platform.indexOf('Mac') >= 0 ? 'metaKey' : 'ctrlKey';

const KeyHandler = {
    init: function() {
        document.addEventListener('keypress', e => this.keypress(e));
        document.addEventListener('keydown', e => this.keydown(e));

        // this.shortcuts[Keys.DOM_VK_A] = [
        //     {
        //         handler: this.handleAKey,
        //         thisArg: this,
        //         shortcut: this.SHORTCUT_ACTION,
        //         modal: true,
        //         noPrevent: true,
        //     },
        // ];
    },
    onKey: function(key, shortcut, modal, noPrevent, event, args) {
        store.dispatch(addKeyShortcut({ key, shortcut, modal, noPrevent, event, args }));
    },
    offKey: function(key, event, arg) {
        store.dispatch(removeKeyShortcut({ key, event, arg }));
    },
    setModal: function(modal) {
        this.modal = modal;
    },
    isActionKey: function(e) {
        return e[shortcutKeyProp];
    },
    keydown: function(e) {
        IdleTracker.regUserAction();
        const state = store.getState();
        const code = e.keyCode || e.which;
        const keyShortcuts = state.ui.shortcuts[code];
        if (keyShortcuts && keyShortcuts.length) {
            for (const sh of keyShortcuts) {
                if (this.modal && !sh.modal) {
                    e.stopPropagation();
                    continue;
                }
                const isActionKey = this.isActionKey(e);
                switch (sh.shortcut) {
                    case ShortcutAction:
                        if (!isActionKey) {
                            continue;
                        }
                        break;
                    case ShortcutOpt:
                        if (!e.altKey) {
                            continue;
                        }
                        break;
                    case ShortcutAction + ShortcutOpt:
                        if (!e.altKey || !isActionKey) {
                            continue;
                        }
                        break;
                    default:
                        if (e.metaKey || e.ctrlKey || e.altKey) {
                            continue;
                        }
                        break;
                }
                if (sh.event) {
                    const event = { type: sh.event };
                    if (sh.arg) {
                        event.arg = sh.arg;
                    }
                    store.dispatch(event);
                }
                if (isActionKey && !sh.noPrevent) {
                    e.preventDefault();
                }
                if (e.isImmediatePropagationStopped()) {
                    break;
                }
            }
        }
    },
    keypress: function(e) {
        if (
            !this.modal &&
            e.charCode !== Keys.DOM_VK_RETURN &&
            e.charCode !== Keys.DOM_VK_ESCAPE &&
            e.charCode !== Keys.DOM_VK_TAB &&
            !e.altKey &&
            !e.ctrlKey &&
            !e.metaKey
        ) {
            this.trigger('keypress', e);
        } else if (this.modal) {
            this.trigger('keypress:' + this.modal, e);
        }
    },
    reg: function() {
        IdleTracker.regUserAction();
    },
    handleAKey: function(e) {
        if (
            e.target.tagName.toLowerCase() === 'input' &&
            ['password', 'text'].indexOf(e.target.type) >= 0
        ) {
            e.stopImmediatePropagation();
        } else {
            e.preventDefault();
        }
    },
};

export default KeyHandler;
