export const type = 'list/set-list-sort';

export function setListSort(sort) {
    return { type, sort };
}

export default function reducer(state, action) {
    if (action.sort === state.sort) {
        return state;
    }
    return {
        ...state,
        sort: action.sort,
    };
}
