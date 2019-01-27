import { uuid } from 'util/generators/id-generator';

export const type = 'files/set-last-files';

export function setLastFiles(files, removeExisting) {
    return { type, files, removeExisting };
}

export default function reducer(state, action) {
    const newFiles = {};
    let { last, byId } = state;
    if (action.removeExisting) {
        last = [];
        byId = {};
    }
    for (let file of action.files) {
        if (!file.id) {
            file = { id: uuid(), ...file };
        }
        const alreadyExists = byId[file.id] || last.some(id => isFileEqual(byId[id], file));
        if (!alreadyExists) {
            newFiles[file.id] = file;
        }
    }
    return {
        ...state,
        byId: { ...byId, ...newFiles },
        last: last.concat(Object.keys(newFiles)),
    };

    function isFileEqual(x, y) {
        return x.storage === y.storage && x.path === y.path && x.name === y.name;
    }
}
