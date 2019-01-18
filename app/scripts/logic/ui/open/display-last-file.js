import { displayFile } from 'store/ui/open/display-file';
import { resetKeyFile } from 'store/ui/open/reset-key-file';

export function displayLastFile(id) {
    return (dispatch, getState) => {
        const state = getState();
        const file = state.files.byId[id];
        if (file) {
            dispatch(resetKeyFile(file));
            dispatch(displayFile(file));
        }
    };
}
