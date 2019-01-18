import { displayFile } from 'store/ui/open/display-file';

export function displayLastFile(id) {
    return (dispatch, getState) => {
        const state = getState();
        const file = state.files.byId[id];
        if (file) {
            dispatch(displayFile(file));
        }
    };
}
