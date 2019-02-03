import getDefaultSettings from 'store/settings/init';

export const type = 'settings/set-settings';

export function setSettings(values) {
    return { type, values };
}

export default function reducer(state, action) {
    state = { ...state, ...action.values };
    console.log('s', state);
    for (const [key, value] of Object.entries(action.values)) {
        if (value === undefined) {
            const defaultValue = getDefaultSettings()[key];
            if (defaultValue === undefined) {
                console.log('del', key);
                delete state[key];
            } else {
                console.log('def', key, defaultValue);
                state[key] = defaultValue;
            }
        }
    }
    return state;
}
