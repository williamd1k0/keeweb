export const action = 'files/add';

export default function add() {
    return { type: action, name: 'xxx' };
}

export function reducer(state, action) {
    return state.concat({ name: action.name });
}
