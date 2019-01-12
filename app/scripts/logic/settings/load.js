import SettingsStore from '../comp/settings-store';
import settingsUpdate from './update';

export default function settingsLoad() {
    return dispatch => {
        return SettingsStore.load('app-settings').then(data => {
            if (data) {
                return dispatch(settingsUpdate(data, { skipSave: true }));
            }
        });
    };
}
