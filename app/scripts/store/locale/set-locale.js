import { reducer as getDefaultLocale } from 'store/locale/init';

export const type = 'locale/set-locale';

export default function(name, values) {
    return { type, name, values };
}

export function reducer(state, action) {
    return Object.assign({}, getDefaultLocale(), { localeName: action.name }, action.values);
}
