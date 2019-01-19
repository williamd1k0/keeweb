import { displayFile } from 'store/ui/open/display-file';

export function displayLastFile(id) {
    return (dispatch, getState) => {
        const state = getState();
        if (state.uiOpen.busy) {
            return;
        }
        const file = state.files.byId[id];
        if (file) {
            dispatch(displayFile(file));
            // TODO: keyfile
        }
    };
}
