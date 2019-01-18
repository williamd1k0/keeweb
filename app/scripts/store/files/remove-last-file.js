export const type = 'files/remove-last-file';

export function removeLastFile(id) {
    return { type, id };
}

export default function reducer(state, action) {
    let { last, byId } = state;
    byId = Object.assign({}, byId);
    delete byId[action.id];
    last = last.filter(id => id !== action.id);

    return Object.assign({}, state, {
        byId,
        last,
    });
}
