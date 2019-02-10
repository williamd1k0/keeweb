export const type = 'generator/set-active-preset';

export function setActivePreset(name) {
    return { type, name };
}

export default function reducer(state, action) {
    return {
        ...state,
        activePreset: action.name,
        options: undefined,
        version: state.version + 1,
    };
}
