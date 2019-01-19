import getDefaultState from 'store/ui/open/init';

export const type = 'ui/open/reset-open-view';

export function resetOpenView(error) {
    return { type, error };
}

export default function reducer() {
    return getDefaultState();
}
