export const type = 'files/add-active-file';

export function addActiveFile(id) {
    return { type, id };
}

export default function reducer(state, action) {
    let { active } = state;
    if (!state.byId[action.id]) {
        return state;
    }
    active = active.concat([action.id]);
    return { ...state, active };
}
