import SettingsStore from 'logic/comp/settings-store';
import { setLastFiles } from 'store/files/set-last-files';
import { displayFile } from 'store/ui/open/display-file';

export default function loadLastFiles() {
    return dispatch => {
        return SettingsStore.load('file-info').then(data => {
            if (data && data.length) {
                const [firstFile] = data;
                dispatch(setLastFiles(data));
                dispatch(displayFile(firstFile));
            }
        });
    };
}
