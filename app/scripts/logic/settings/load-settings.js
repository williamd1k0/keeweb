import SettingsStore from '../comp/settings-store';
import updateSettings from './update-settings';

export default function loadSettings() {
    return dispatch => {
        return SettingsStore.load('app-settings').then(data => {
            if (data) {
                return dispatch(updateSettings(data, { skipSave: true }));
            }
        });
    };
}
