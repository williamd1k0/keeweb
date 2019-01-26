export const type = 'menu/set-menu-selection';

export function setMenuSelection(menuId, itemId, filterKey, filterValue) {
    return { type, menuId, itemId, filterKey, filterValue };
}

export default function reducer(state, action) {
    const menu = state[action.menuId];
    if (!menu) {
        return state;
    }
    return Object.assign({}, state, {
        [action.menuId]: Object.assign({}, menu, {
            active: action.itemId,
            filterKey: action.filterKey,
            filterValue: action.filterValue,
        }),
    });
}
