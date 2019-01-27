export const type = 'list/set-advanced-search-option';

export function setAdvancedSearchOption(option, value) {
    return { type, option, value };
}

export default function reducer(state, action) {
    return {
        ...state,
        advanced: { ...state.advanced, [action.option]: action.value },
    };
}
