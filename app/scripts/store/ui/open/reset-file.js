export const type = 'ui/open/reset-file';

export function resetFile() {
    return { type };
}

export default function reducer(state) {
    return { ...state, file: undefined, keyFile: undefined };
}
