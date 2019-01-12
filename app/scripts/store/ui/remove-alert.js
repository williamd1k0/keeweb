export const type = 'ui/remove-alert';

export default function() {
    return { type };
}

export function reducer(state) {
    state = Object.assign({}, state);
    delete state.alert;
    return state;
}
