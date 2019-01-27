import { setSettings } from 'store/settings/set-settings';
import { setLocale } from 'store/locale/set-locale';
import { SettingsStore } from 'logic/comp/settings-store';

import base from 'locales/base.json';
import localeFR from 'locales/fr-FR';
import localeDE from 'locales/de-DE';

const Locales = {
    en: base,
    de: localeDE,
    'de-DE': localeDE,
    fr: localeFR,
    'fr-FR': localeFR,
};

const BaseLocaleName = 'en';

export function updateSettings(values, options = {}) {
    return (dispatch, getState) => {
        const oldState = getState();

        const newLocaleForSettings = setLocaleIfRequired();
        if (newLocaleForSettings) {
            values = { ...values, locale: newLocaleForSettings };
        }

        dispatch(setSettings(values));

        return Promise.resolve().then(() => {
            if (values.theme) {
                updateThemeMetaTag(values.theme);
            }
            if (!options.skipSave) {
                return SettingsStore.save('app-settings', values);
            }
        });

        function setLocaleIfRequired() {
            let newLocale;

            const isDefaultLocaleAndNoLocaleInSettings =
                oldState.locale.localeName === null && !values.locale;
            const localeChanged =
                values.hasOwnProperty('locale') && values.locale !== oldState.settings.locale;

            if (isDefaultLocaleAndNoLocaleInSettings) {
                newLocale = getBrowserLocale();
            } else if (localeChanged) {
                newLocale = values.locale || getBrowserLocale();
            }
            if (newLocale) {
                const localeValues = loadLocale(newLocale);
                if (localeValues) {
                    dispatch(setLocale(newLocale, localeValues));
                } else {
                    dispatch(setLocale(BaseLocaleName, {}));
                    return BaseLocaleName;
                }
            }
        }

        function loadLocale(name) {
            return Locales[name];
        }

        function getBrowserLocale() {
            const language = (navigator.languages && navigator.languages[0]) || navigator.language;
            if (language && language.lastIndexOf('en', 0) === 0) {
                return 'en';
            }
            return language;
        }

        function updateThemeMetaTag(theme) {
            const metaThemeColor = document.head.querySelector('meta[name=theme-color]');
            if (metaThemeColor) {
                const el = document.querySelector('.app');
                metaThemeColor.content = window.getComputedStyle(el).backgroundColor;
            }
            const prefix = 'th-';
            for (const cls of document.body.classList) {
                if (cls.startsWith(prefix)) {
                    document.body.classList.remove(cls);
                }
            }
            document.body.classList.add(`${prefix}${theme}`);
        }
    };
}
