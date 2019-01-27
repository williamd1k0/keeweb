export const type = 'ui/open/set-loading';

export function setLoading(loading) {
    return { type, loading };
}

export default function reducer(state, action) {
    return { ...state, busy: !!action.loading, loading: action.loading };
}
