import SettingsStore from 'logic/comp/settings-store';
import setLastFiles from 'store/files/set-last-files';

export default function loadLastFiles() {
    return dispatch => {
        return SettingsStore.load('file-info').then(data => {
            if (data) {
                return dispatch(setLastFiles(data));
            }
        });
    };
}
