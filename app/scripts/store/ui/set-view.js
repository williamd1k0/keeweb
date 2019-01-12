export const type = 'ui/set-view';

export default function(view) {
    return { type, view };
}

export function reducer(state, action) {
    return Object.assign({}, state, { view: action.view });
}
