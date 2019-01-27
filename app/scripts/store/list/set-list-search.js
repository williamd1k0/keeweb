export const type = 'list/set-list-search';

export function setListSearch(value) {
    return { type, value };
}

export default function reducer(state, action) {
    return {
        ...state,
        search: action.value,
    };
}
