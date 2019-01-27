export const type = 'ui/open/set-open-error';

export function setOpenError(error) {
    return { type, error };
}

export default function reducer(state, action) {
    return { ...state, error: action.error };
}
