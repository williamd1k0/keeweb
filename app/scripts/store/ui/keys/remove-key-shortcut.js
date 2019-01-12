export const type = 'ui/remove-key-shortcut';

export default function({ key, event, arg }) {
    return { type, key, config: { event, arg } };
}

export function reducer(state, action) {
    const { key, config } = action;
    const shortcuts = state.shortcuts;
    const keyShortcuts = shortcuts[key];
    if (keyShortcuts) {
        return Object.assign({}, shortcuts, {
            [key]: keyShortcuts.filter(sh => {
                return !(sh.event === config.event && sh.arg === config.arg);
            }),
        });
    }
    return state;
}
