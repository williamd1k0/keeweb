import SettingsStore from '../comp/settings-store';
import setRuntime from '../../store/runtime/set-runtime';

export default function loadRuntime() {
    return dispatch => {
        return SettingsStore.load('runtime-data').then(data => {
            if (data) {
                return dispatch(setRuntime(data));
            }
        });
    };
}
