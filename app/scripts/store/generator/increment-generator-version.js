export const type = 'generator/increment-generator-version';

export function incrementGeneratorVersion() {
    return { type };
}

export default function reducer(state) {
    return {
        ...state,
        version: state.version + 1,
    };
}
