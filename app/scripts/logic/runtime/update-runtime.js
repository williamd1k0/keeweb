import setRuntime from '../../store/runtime/set-runtime';
import SettingsStore from '../comp/settings-store';

export default function updateRuntime(values) {
    return dispatch => {
        dispatch(setRuntime(values));
        return SettingsStore.save('runtime-data', values);
    };
}
