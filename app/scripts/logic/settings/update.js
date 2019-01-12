import settingsSet from '../../store/settings/set';
import localeSet from '../../store/locale/set';
import SettingsStore from '../comp/settings-store';

export default function settingsUpdate(values, options = {}) {
    return (dispatch, getState) => {
        const oldState = getState();

        dispatch(settingsSet(values));

        if (values.locale !== undefined && values.locale !== oldState.settings.locale) {
            dispatch(localeSet(values.locale));
        }

        return Promise.resolve().then(() => {
            if (!options.skipSave) {
                return SettingsStore.save('app-settings', values);
            }
        });
    };
}
