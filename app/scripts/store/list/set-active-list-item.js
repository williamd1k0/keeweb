export const type = 'list/set-active-list-item';

export function setActiveListItem(itemId) {
    return { type, itemId };
}

export default function reducer(state, action) {
    return { ...state, active: action.itemId };
}
