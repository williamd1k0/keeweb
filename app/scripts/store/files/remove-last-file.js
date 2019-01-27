import { omit } from 'util/helpers/fn';

export const type = 'files/remove-last-file';

export function removeLastFile(id) {
    return { type, id };
}

export default function reducer(state, action) {
    let { last, byId } = state;
    byId = omit(byId, [action.id]);
    last = last.filter(id => id !== action.id);

    return { ...state, byId, last };
}
