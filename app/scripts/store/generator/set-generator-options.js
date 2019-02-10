export const type = 'generator/set-generator-options';

export function setGeneratorOptions(opt) {
    return { type, opt };
}

export default function reducer(state, action) {
    return {
        ...state,
        options: action.opt,
        activePreset: undefined,
        version: state.version + 1,
    };
}
