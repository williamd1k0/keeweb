export const type = 'files/add';

export default function(name) {
    return { type, name };
}

export function reducer(state, action) {
    return state.concat({ name: action.name });
}
