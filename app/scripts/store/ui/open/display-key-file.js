export const type = 'ui/open/display-key-file';

export function displayKeyFile(keyFile) {
    return { type, keyFile };
}

export default function reducer(state, action) {
    return Object.assign({}, state, {
        file: Object.assign({}, state.file, {
            keyFileName: action.keyFile.name,
            keyFileData: action.keyFile.data,
        }),
    });
}
