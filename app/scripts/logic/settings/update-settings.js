import setSettings from '../../store/settings/set-settings';
import setLocale from '../../store/locale/set-locale';
import SettingsStore from '../comp/settings-store';

export default function updateSettings(values, options = {}) {
    return (dispatch, getState) => {
        const oldState = getState();

        dispatch(setSettings(values));

        if (values.locale !== undefined && values.locale !== oldState.settings.locale) {
            dispatch(setLocale(values.locale));
        }

        return Promise.resolve().then(() => {
            if (!options.skipSave) {
                return SettingsStore.save('app-settings', values);
            }
        });
    };
}
