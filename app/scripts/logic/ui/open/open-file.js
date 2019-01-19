import { FileRepository } from 'logic/comp/file-repository';
import { setLoading } from 'store/ui/open/set-loading';

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
        dispatch(setLoading('file'));
        // TODO: open file
        console.log(file, keyFile, password);
    };
}
