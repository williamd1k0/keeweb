export const type = 'files/set-file-props';

export function setFileProps(id, data) {
    return { type, id, data };
}

export default function reducer(state, action) {
    const file = state.byId[action.id] || {};
    const newFile = { ...file };
    for (const [key, value] of Object.entries(action.data)) {
        if (value === undefined) {
            delete newFile[key];
        } else {
            newFile[key] = value;
        }
    }
    return {
        ...state,
        byId: {
            ...state.byId,
            [action.id]: newFile,
        },
    };
}
