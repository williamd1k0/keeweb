import { removeLastFile as storeRemoveLastFile } from 'store/files/remove-last-file';
import { resetFile } from 'store/ui/open/reset-file';
import { saveLastFiles } from 'logic/files/save-last-files';

export function removeLastFile(id) {
    return (dispatch, getState) => {
        const state = getState();
        if (state.uiOpen.file.id === id) {
            dispatch(resetFile());
        }
        dispatch(storeRemoveLastFile(id));
        return dispatch(saveLastFiles());
    };
}
