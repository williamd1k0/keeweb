export const type = 'files/set-file-props';

export function setFileProps(id, data) {
    return { type, id, data };
}

export default function reducer(state, action) {
    const file = state.byId[action.id] || {};
    const newFile = Object.assign({}, file);
    for (const [key, value] of Object.entries(action.data)) {
        if (value === undefined) {
            delete newFile[key];
        } else {
            newFile[key] = value;
        }
    }
    return Object.assign({}, state, {
        byId: Object.assign(
            {},
            state.byId,
            {
                [action.id]: newFile,
            },
            {
                version: (file.version || 0) + 1,
            }
        ),
    });
}
