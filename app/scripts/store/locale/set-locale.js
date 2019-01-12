import base from '../../../locales/base.json';
import localeFR from '../../../locales/fr-FR';
import localeDE from '../../../locales/de-DE';

const locales = {
    en: base,
    'de-DE': localeDE,
    'fr-FR': localeFR,
};

export const type = 'locale/set-locale';

export default function(name) {
    return { type, name };
}

export function reducer(state, action) {
    const locale = locales[action.name];
    return Object.assign({}, base, locale);
}
