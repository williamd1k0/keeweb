export const type = 'list/toggle-advanced-search';

export function toggleAdvancedSearch() {
    return { type };
}

export default function reducer(state) {
    return { ...state, advancedEnabled: !state.advancedEnabled };
}
