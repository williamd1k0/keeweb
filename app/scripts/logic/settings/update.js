import settingsSet from '../../store/settings/set';
import localeSet from '../../store/locale/set';

export default function settingsUpdate(values) {
    return (dispatch, getState) => {
        const oldState = getState();

        dispatch(settingsSet(values));

        if (values.locale !== undefined && values.locale !== oldState.settings.locale) {
            dispatch(localeSet(values.locale));
        }
    };
}
