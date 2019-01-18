export const type = 'ui/set-view';

export function setView(view) {
    return { type, view };
}

export default function reducer(state, action) {
    return Object.assign({}, state, { view: action.view });
}
