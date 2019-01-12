export const type = 'ui/add-key-shortcut';

export default function({ key, shortcut, modal, noPrevent, event, arg }) {
    return { type, key, config: { shortcut, modal, noPrevent, event, arg } };
}

export function reducer(state, action) {
    const { key, config } = action;
    const shortcuts = state.shortcuts;
    const keyShortcuts = shortcuts[key] || [];
    return Object.assign({}, shortcuts, {
        [key]: keyShortcuts.concat(config),
    });
}
