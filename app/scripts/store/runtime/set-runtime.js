export const type = 'runtime/set-runtime';

export default function(values) {
    return { type, values };
}

export function reducer(state, action) {
    state = Object.assign({}, state, action.values);
    for (const [key, value] of Object.entries(action.values)) {
        if (value === undefined) {
            delete state[key];
        }
    }
    return state;
}
