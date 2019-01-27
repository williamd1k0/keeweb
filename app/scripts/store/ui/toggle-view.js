export const type = 'ui/toggle-view';

export function toggleView(view, another) {
    return { type, view, another };
}

export default function reducer(state, action) {
    const view = state.view === action.view ? action.another : action.view;
    return { ...state, view };
}
