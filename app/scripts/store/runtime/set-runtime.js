export const type = 'runtime/set-runtime';

export default function(values) {
    return { type, values };
}

export function reducer(state, action) {
    return Object.assign({}, state, action.values);
}
