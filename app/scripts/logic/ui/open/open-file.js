import { FileRepository } from 'logic/comp/file-repository';

export function openFile(password) {
    return (dispatch, getState) => {
        const state = getState();
        if (state.uiOpen.busy) {
            return Promise.resolve();
        }
        const { file, keyFile } = state.uiOpen;
        if (!file) {
            return;
        }
        // TODO: open file
        console.log(file, keyFile, password);
    };
}
