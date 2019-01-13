import SettingsStore from '../comp/settings-store';
import setFiles from '../../store/files/set-files';

export default function loadFileInfo() {
    return dispatch => {
        return SettingsStore.load('file-info').then(data => {
            if (data) {
                return dispatch(setFiles(data));
            }
        });
    };
}
