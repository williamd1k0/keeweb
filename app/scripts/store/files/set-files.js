export const type = 'files/set-files';

export default function(files) {
    return { type, files };
}

export function reducer(state, action) {
    return action.files;
}
