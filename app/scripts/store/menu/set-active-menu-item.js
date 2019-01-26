export const type = 'menu/set-active-menu-item';

export function setActiveMenuItem(menuId, itemId) {
    return { type, menuId, itemId };
}

export default function reducer(state, action) {
    const menu = state[action.menuId];
    if (!menu) {
        return state;
    }
    return Object.assign({}, state, {
        [action.menuId]: Object.assign({}, menu, { active: action.itemId }),
    });
}
