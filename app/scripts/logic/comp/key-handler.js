import { Keys } from 'const/keys';
import { IdleTracker } from 'logic/comp/idle-tracker';

const shortcutKeyProp = navigator.platform.indexOf('Mac') >= 0 ? 'metaKey' : 'ctrlKey';

const KeyHandler = {
    SHORTCUT_ACTION: 1,
    SHORTCUT_OPT: 2,

    shortcuts: {},
    modalStack: [],
    keyPressHandlers: [],

    init() {
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
    onKey(key, handler, thisArg, shortcut, modal, noPrevent) {
        let keyShortcuts = this.shortcuts[key];
        if (!keyShortcuts) {
            this.shortcuts[key] = keyShortcuts = [];
        }
        keyShortcuts.push({
            handler,
            thisArg,
            shortcut,
            modal,
            noPrevent,
        });
        return () => {
            KeyHandler.offKey(key, handler, thisArg);
        };
    },
    offKey(key, handler, thisArg) {
        if (this.shortcuts[key]) {
            this.shortcuts[key] = this.shortcuts[key].filter(
                sh => sh.handler !== handler || sh.thisArg !== thisArg
            );
        }
    },
    onKeyPress(handler, thisArg, modal) {
        this.keyPressHandlers.push({ handler, thisArg, modal });
        return () => {
            KeyHandler.offKeyPress(handler, thisArg);
        };
    },
    offKeyPress(handler, thisArg) {
        this.keyPressHandlers = this.keyPressHandlers.filter(
            kp => kp.handler !== handler || kp.thisArg !== thisArg
        );
    },
    setModal(modal) {
        this.modalStack.push(modal);
        return () => {
            this.resetModal();
        };
    },
    resetModal() {
        this.modalStack.pop();
    },
    isActionKey(e) {
        return e[shortcutKeyProp];
    },
    keydown(e) {
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
    keypress(e) {
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
                    kph.handler.call(kph.thisArg, e);
                }
            }
        }
    },
    reg() {
        IdleTracker.regUserAction();
    },
    handleAKey(e) {
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

export { KeyHandler };
