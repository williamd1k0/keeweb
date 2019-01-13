import { uuid } from 'util/generators/id-generator';
export const type = 'files/set-files';

export default function(files) {
    return { type, files };
}

export function reducer(state, action) {
    const newFiles = {};
    for (let file of action.files) {
        if (!file.id) {
            file = Object.assign({ id: uuid() }, file);
        }
        if (!state.byId[file.id]) {
            newFiles[file.id] = file;
        }
    }
    return Object.assign({}, state, {
        byId: Object.assign({}, state.byId, newFiles),
        last: state.last.concat(Object.keys(newFiles)),
    });
}
