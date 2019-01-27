export const type = 'ui/set-view';

export function setView(view) {
    return { type, view };
}

export default function reducer(state, action) {
    return { ...state, view: action.view };
}
