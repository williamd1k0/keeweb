export const type = 'ui/open/toggle-second-row';

export default function() {
    return { type };
}

export function reducer(state) {
    return Object.assign({}, state, { secondRowVisible: !state.secondRowVisible });
}
