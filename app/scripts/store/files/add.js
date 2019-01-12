export const type = 'files/add';

export default function add(name) {
    return { type, name };
}

export function reducer(state, action) {
    return state.concat({ name: action.name });
}
