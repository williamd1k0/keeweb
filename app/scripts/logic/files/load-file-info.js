import SettingsStore from '../comp/settings-store';

export default function runtimeLoad() {
    return dispatch => {
        return SettingsStore.load('file-info').then(data => {
            if (data) {
                // return dispatch(setFiles(data));
            }
        });
    };
}
