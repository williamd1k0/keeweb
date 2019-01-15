export const type = 'ui/alert/set-alert';

export default function(config) {
    return { type, config };
}

export function reducer(state, action) {
    return action.config;
}
