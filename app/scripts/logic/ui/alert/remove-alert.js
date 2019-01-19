import { removeAlert as uiRemoveAlert } from 'store/ui/alert/remove-alert';
import { setAlert } from 'store/ui/alert/set-alert';

export function removeAlert() {
    return (dispatch, getState) => {
        const state = getState();
        const alert = state.uiAlert;
        if (alert) {
            const nextAlert = alert.next;
            dispatch(uiRemoveAlert());
            if (nextAlert) {
                setTimeout(() => dispatch(setAlert(nextAlert)), 0);
            }
        }
    };
}
