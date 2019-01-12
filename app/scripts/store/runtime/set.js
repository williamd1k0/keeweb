export const type = 'runtime/set';

export default function(values) {
    return { type, values };
}

export function reducer(state, action) {
    return Object.assign({}, state, action.values);
}
