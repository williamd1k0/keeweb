export const type = 'ui/open/set-loading';

export function setLoading(loading) {
    return { type, loading };
}

export default function reducer(state, action) {
    return Object.assign({}, state, {
        busy: !!action.loading,
        loading: action.loading,
    });
}
