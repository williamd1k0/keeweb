import { initAllStorageProviders } from 'storage';

export function initStorage() {
    return (dispatch, getState) => {
        initAllStorageProviders(dispatch, getState);
    };
}
