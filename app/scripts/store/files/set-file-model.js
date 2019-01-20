export const type = 'files/set-file-model';

export function setFileModel(file) {
    return { type, file };
}

export default function reducer(state, action) {
    const fileId = action.file && action.file.id;
    if (!fileId) {
        return state;
    }
    const file = state.byId[fileId];
    if (!file) {
        return state;
    }
    return Object.assign({}, state, {
        byId: Object.assign(
            {},
            state.byId,
            {
                [fileId]: Object.assign({}, file, action.file),
            },
            { version: (file.version || 0) + 1 }
        ),
    });
}
