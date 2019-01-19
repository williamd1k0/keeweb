export const type = 'files/add-last-file';

export function addLastFile(id) {
    return { type, id };
}

export default function reducer(state, action) {
    let { last } = state;
    if (!state.byId[action.id]) {
        return state;
    }
    last = last.filter(id => id !== action.id);
    last.unshift(action.id);

    return Object.assign({}, state, { last });
}
