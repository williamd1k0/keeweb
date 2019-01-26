export const type = 'list/toggle-advanced-search';

export function toggleAdvancedSearch() {
    return { type };
}

export default function reducer(state) {
    return Object.assign({}, state, {
        advancedEnabled: !state.advancedEnabled,
    });
}
