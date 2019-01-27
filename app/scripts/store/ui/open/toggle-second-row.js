export const type = 'ui/open/toggle-second-row';

export function toggleSecondRow() {
    return { type };
}

export default function reducer(state) {
    return { ...state, secondRowVisible: !state.secondRowVisible };
}
