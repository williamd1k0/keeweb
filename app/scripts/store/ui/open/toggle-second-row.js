export const type = 'ui/open/toggle-second-row';

export function toggleSecondRow() {
    return { type };
}

export default function reducer(state) {
    return Object.assign({}, state, { secondRowVisible: !state.secondRowVisible });
}
