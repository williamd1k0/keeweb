import { SettingsStore } from 'logic/comp/settings-store';
import { getLastFiles } from 'selectors/files';

export function saveLastFiles() {
    return (dispatch, getState) => {
        const files = getLastFiles(getState());
        return SettingsStore.save('file-info', files);
    };
}
