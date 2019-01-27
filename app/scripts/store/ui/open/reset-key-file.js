import { omit } from 'util/helpers/fn';

const keyFileProps = ['keyFileName', 'keyFileData', 'keyFilePath', 'keyFileHash'];

export const type = 'ui/open/reset-key-file';

export function resetKeyFile() {
    return { type };
}

export default function reducer(state) {
    if (!state || !state.file) {
        return state;
    }
    return Object.assign({}, state, { file: omit(state.file, keyFileProps) });
}
