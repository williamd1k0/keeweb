export function openFile(password) {
    return (dispatch, getState) => {
        const state = getState();
        const { file, keyFile } = state.uiOpen;
        if (!file) {
            return;
        }
        // TODO: open file
        console.log(file, keyFile, password);
    };
}
