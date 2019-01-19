import { displayLastFile } from 'logic/ui/open/display-last-file';

export function moveFileSelection(offset) {
    return (dispatch, getState) => {
        const state = getState();
        if (!state.uiOpen.file || state.uiOpen.busy) {
            return;
        }
        const lastFiles = state.files.last;
        const currentFile = state.uiOpen.file.id;
        const currentFileIndex = lastFiles.indexOf(currentFile);
        if (currentFileIndex < 0) {
            return;
        }
        const newFileIndex = currentFileIndex + offset;
        if (newFileIndex < 0 || newFileIndex >= lastFiles.length) {
            return;
        }
        const newFileId = lastFiles[newFileIndex];
        return dispatch(displayLastFile(newFileId));
    };
}
