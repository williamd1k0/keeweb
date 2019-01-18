import getDefaultLocale from 'store/locale/init';

export const type = 'locale/set-locale';

export function setLocale(name, values) {
    return { type, name, values };
}

export default function reducer(state, action) {
    return Object.assign({}, getDefaultLocale(), { localeName: action.name }, action.values);
}
