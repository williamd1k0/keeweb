export const type = 'ui/alert/set-alert';

export function setAlert(config) {
    return { type, config };
}

export default function reducer(state, action) {
    return setAlertInState(state, action.config);
}

function setAlertInState(state, config) {
    if (state) {
        return { ...state, next: setAlertInState(state.next, config) };
    } else {
        return config;
    }
}
