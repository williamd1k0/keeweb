export const type = 'files/add-open-file';

export function addOpenFile(id) {
    return { type, id };
}

export default function reducer(state, action) {
    let { open } = state;
    if (!state.byId[action.id]) {
        return state;
    }
    open = open.concat([action.id]);
    return Object.assign({}, state, { open });
}
