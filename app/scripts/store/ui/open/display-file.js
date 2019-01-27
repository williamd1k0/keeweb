export const type = 'ui/open/display-file';

export function displayFile(file) {
    return { type, file };
}

export default function reducer(state, action) {
    return { ...state, file: action.file, keyFile: undefined };
}
