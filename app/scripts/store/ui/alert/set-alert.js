export const type = 'ui/alert/set-alert';

export function setAlert(config) {
    return { type, config };
}

export default function reducer(state, action) {
    return action.config;
}
