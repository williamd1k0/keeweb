import SettingsStore from '../comp/settings-store';
import runtimeSet from '../../store/runtime/set';

export default function runtimeLoad() {
    return dispatch => {
        return SettingsStore.load('runtime-data').then(data => {
            if (data) {
                return dispatch(runtimeSet(data));
            }
        });
    };
}
