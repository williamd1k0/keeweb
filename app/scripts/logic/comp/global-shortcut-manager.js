import { store } from 'store';
import { Keys } from 'const/keys';
import { KeyHandler } from 'logic/comp/key-handler';
import { setMenuSelection } from 'store/menu/set-menu-selection';
import { hasActiveFiles } from 'selectors/files';
import { setView } from 'store/ui/set-view';

const GlobalShortcutManager = {
    init() {
        KeyHandler.onKey(
            Keys.DOM_VK_A,
            this.handleCmdAModal,
            this,
            KeyHandler.SHORTCUT_ACTION,
            true,
            true
        );
        KeyHandler.onKey(Keys.DOM_VK_A, this.handleMetaA, this, KeyHandler.SHORTCUT_ACTION);
        KeyHandler.onKey(Keys.DOM_VK_A, this.handleMetaA, this, KeyHandler.SHORTCUT_OPT);
        KeyHandler.onKey(Keys.DOM_VK_C, this.handleOptC, this, KeyHandler.SHORTCUT_OPT);
        KeyHandler.onKey(Keys.DOM_VK_D, this.handleCmdD, this, KeyHandler.SHORTCUT_ACTION);
        KeyHandler.onKey(Keys.DOM_VK_ESCAPE, this.handleEsc, this);
        KeyHandler.onKey(Keys.DOM_VK_COMMA, this.handleComma, this, KeyHandler.SHORTCUT_ACTION);
        KeyHandler.onKey(Keys.DOM_VK_PERIOD, this.handleComma, this, KeyHandler.SHORTCUT_ACTION);
    },
    handleCmdAModal(e) {
        if (
            e.target.tagName.toLowerCase() === 'input' &&
            ['password', 'text'].indexOf(e.target.type) >= 0
        ) {
            e.stopImmediatePropagation();
            return false;
        } else {
            e.preventDefault();
        }
    },
    handleMetaA() {
        this.setMainMenuItemAndOpenList('all');
    },
    handleOptC() {
        this.setMainMenuItemAndOpenList('colors');
    },
    handleCmdD() {
        this.setMainMenuItemAndOpenList('trash');
    },
    handleEsc() {
        const state = store.getState();
        if (!hasActiveFiles(state)) {
            return;
        }
        if (state.ui.view !== 'list') {
            store.dispatch(setView('list'));
        }
    },
    handleComma() {
        const state = store.getState();
        if (state.ui.view !== 'settings') {
            store.dispatch(setView('settings'));
        }
    },
    setMainMenuItemAndOpenList(itemId) {
        const state = store.getState();
        if (!hasActiveFiles(state)) {
            return;
        }
        this.setMenuItem('list', itemId);
        if (state.ui.view !== 'list') {
            store.dispatch(setView('list'));
        }
    },
    setMenuItem(menuId, itemId) {
        const state = store.getState();
        const item = state.menu.items[itemId];
        const { option, filterKey, filterValue } = item;
        store.dispatch(setMenuSelection(menuId, item.id, option, filterKey, filterValue));
    },
};

export { GlobalShortcutManager };
