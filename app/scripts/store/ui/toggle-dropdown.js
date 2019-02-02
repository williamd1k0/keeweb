export const type = 'ui/toggle-dropdown';

export function toggleDropdown(dropdown) {
    return { type, dropdown };
}

export default function reducer(state, action) {
    let { dropdown } = action;
    if (dropdown && state.dropdown && dropdown.id === state.dropdown.id) {
        dropdown = undefined;
    }
    return { ...state, dropdown };
}
