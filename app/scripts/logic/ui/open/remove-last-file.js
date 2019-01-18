import { removeLastFile as storeRemoveLastFile } from 'store/files/remove-last-file';
import { resetFile } from 'store/ui/open/reset-file';
import { saveLastFiles } from 'logic/files/save-last-files';
import { showAlert } from 'logic/ui/alert/show-alert';

export function removeLastFile(id) {
    return (dispatch, getState) => {
        return Promise.resolve()
            .then(() => {
                const state = getState();
                const file = state.files.byId[id];
                if (!file.storage || file.modified) {
                    return dispatch(
                        showAlert({
                            preset: 'yesno',
                            header: 'openRemoveLastQuestion',
                            body: file.modified
                                ? 'openRemoveLastQuestionModBody'
                                : 'openRemoveLastQuestionBody',
                            buttons: [
                                { result: 'yes', title: 'alertYes' },
                                { result: '', title: 'alertNo' },
                            ],
                        })
                    ).then(({ result }) => {
                        return !!result;
                    });
                }
                return true;
            })
            .then(proceed => {
                if (proceed) {
                    const state = getState();
                    if (state.uiOpen.file.id === id) {
                        dispatch(resetFile());
                    }
                    dispatch(storeRemoveLastFile(id));
                    return dispatch(saveLastFiles());
                }
            });
    };
}
