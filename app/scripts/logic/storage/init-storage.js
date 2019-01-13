import { initAllStorageProviders } from 'storage';

export default function initStorage() {
    return (dispatch, getState) => {
        initAllStorageProviders(dispatch, getState);
    };
}
