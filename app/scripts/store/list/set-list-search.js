export const type = 'list/set-list-search';

export function setListSearch(value) {
    return { type, value };
}

export default function reducer(state, action) {
    return Object.assign({}, state, {
        search: action.value,
    });
}
