export const type = 'files/set-file-model';

export function setFileModel(data) {
    return { type, data };
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
