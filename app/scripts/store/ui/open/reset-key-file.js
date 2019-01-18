export const type = 'ui/open/reset-key-file';

export function resetKeyFile() {
    return { type };
}

export default function reducer(state) {
    return Object.assign({}, state, { keyFile: undefined });
}
