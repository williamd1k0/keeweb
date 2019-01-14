import { uuid } from 'util/generators/id-generator';

export const type = 'files/set-last-files';

export default function(files, removeExisting) {
    return { type, files, removeExisting };
}

export function reducer(state, action) {
    const newFiles = {};
    let { last, byId } = state;
    if (action.removeExisting) {
        last = [];
        byId = {};
    }
    for (let file of action.files) {
        if (!file.id) {
            file = Object.assign({ id: uuid() }, file);
        }
        const alreadyExists = byId[file.id] || last.some(id => isFileEqual(byId[id], file));
        if (!alreadyExists) {
            newFiles[file.id] = file;
        }
    }
    return Object.assign({}, state, {
        byId: Object.assign({}, byId, newFiles),
        last: last.concat(Object.keys(newFiles)),
    });

    function isFileEqual(x, y) {
        return x.storage === y.storage && x.path === y.path && x.name === y.name;
    }
}
