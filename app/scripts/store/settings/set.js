import { reducer as getDefaultSettings } from './init';

export const type = 'settings/set';

export default function(values) {
    return { type, values };
}

export function reducer(state, action) {
    state = Object.assign({}, state, action.values);
    for (const [key, value] of Object.entries(action.values)) {
        if (value === undefined) {
            const defaultValue = getDefaultSettings()[key];
            if (defaultValue === undefined) {
                delete state[key];
            } else {
                state[key] = defaultValue;
            }
        }
    }
    return state;
}
