import { setLoading } from 'store/ui/open/set-loading';
import { setOpenError } from 'store/ui/open/set-open-error';

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
        console.log(file, keyFile, password); // TODO
        setTimeout(() => {
            dispatch(setLoading(undefined));
            dispatch(setOpenError('wrong-password'));
        }, 1000);
    };
}
