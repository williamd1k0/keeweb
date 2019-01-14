import Keys from 'const/keys';
import IdleTracker from 'logic/comp/idle-tracker';

const shortcutKeyProp = navigator.platform.indexOf('Mac') >= 0 ? 'metaKey' : 'ctrlKey';

const KeyHandler = {
    SHORTCUT_ACTION: 1,
    SHORTCUT_OPT: 2,

    shortcuts: {},
    modalStack: [],
    keyPressHandlers: [],

    init: function() {
        document.addEventListener('keypress', e => this.keypress(e));
        document.addEventListener('keydown', e => this.keydown(e));

        this.shortcuts[Keys.DOM_VK_A] = [
            {
                handler: e => this.handleAKey(e),
                thisArg: this,
                shortcut: this.SHORTCUT_ACTION,
                modal: true,
                noPrevent: true,
            },
        ];
    },
    onKey: function(key, handler, thisArg, shortcut, modal, noPrevent) {
        let keyShortcuts = this.shortcuts[key];
        if (!keyShortcuts) {
            this.shortcuts[key] = keyShortcuts = [];
        }
        keyShortcuts.push({
            handler: handler,
            thisArg: thisArg,
            shortcut: shortcut,
            modal: modal,
            noPrevent: noPrevent,
        });
        return () => {
            KeyHandler.offKey(key, handler, thisArg);
        };
    },
    offKey: function(key, handler, thisArg) {
        if (this.shortcuts[key]) {
            this.shortcuts[key] = this.shortcuts[key].filter(
                sh => sh.handler !== handler || sh.thisArg !== thisArg
            );
        }
    },
    onKeyPress: function(modal, handler) {
        this.keyPressHandlers.push({ modal, handler });
    },
    offKeyPress: function(modal, handler) {
        this.keyPressHandlers = this.keyPressHandlers.filter(kp => kp.handler !== handler);
    },
    setModal: function(modal) {
        this.modalStack.push(modal);
        return () => {
            this.resetModal();
        };
    },
    resetModal: function() {
        this.modalStack.pop();
    },
    isActionKey: function(e) {
        return e[shortcutKeyProp];
    },
    keydown: function(e) {
        IdleTracker.regUserAction();
        const code = e.keyCode || e.which;
        const keyShortcuts = this.shortcuts[code];
        if (keyShortcuts && keyShortcuts.length) {
            for (const sh of keyShortcuts) {
                if (this.modalStack.length && !sh.modal) {
                    e.stopPropagation();
                    continue;
                }
                const isActionKey = this.isActionKey(e);
                switch (sh.shortcut) {
                    case this.SHORTCUT_ACTION:
                        if (!isActionKey) {
                            continue;
                        }
                        break;
                    case this.SHORTCUT_OPT:
                        if (!e.altKey) {
                            continue;
                        }
                        break;
                    case this.SHORTCUT_ACTION + this.SHORTCUT_OPT:
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
                const result = sh.handler.call(sh.thisArg, e, code);
                if (isActionKey && !sh.noPrevent) {
                    e.preventDefault();
                }
                if (result === false) {
                    break;
                }
            }
        }
    },
    keypress: function(e) {
        if (
            e.charCode !== Keys.DOM_VK_RETURN &&
            e.charCode !== Keys.DOM_VK_ESCAPE &&
            e.charCode !== Keys.DOM_VK_TAB &&
            !e.altKey &&
            !e.ctrlKey &&
            !e.metaKey
        ) {
            const modal = this.modalStack.length
                ? this.modalStack[this.modalStack.length - 1]
                : null;
            for (const kph of this.keyPressHandlers) {
                if (!modal || modal === kph.modal) {
                    kph.handler.call(undefined, e);
                }
            }
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
