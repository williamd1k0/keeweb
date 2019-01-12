export const type = 'ui/set-alert';

export default function(config) {
    return { type, config };
}

export function reducer(state, action) {
    return Object.assign({}, state, { alert: action.config });
}
