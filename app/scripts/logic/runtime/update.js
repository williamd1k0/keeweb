import runtimeSet from '../../store/runtime/set';
import SettingsStore from '../comp/settings-store';

export default function runtimeUpdate(values) {
    return dispatch => {
        dispatch(runtimeSet(values));
        return SettingsStore.save('runtime-data', values);
    };
}
