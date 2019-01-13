import SettingsStore from 'logic/comp/settings-store';
import updateSettings from 'logic/settings/update-settings';

export default function loadSettings() {
    return dispatch => {
        return SettingsStore.load('app-settings').then(data => {
            if (data) {
                return dispatch(updateSettings(data, { skipSave: true }));
            }
        });
    };
}
