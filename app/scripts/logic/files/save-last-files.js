import { SettingsStore } from 'logic/comp/settings-store';
import { getLastFiles } from 'selectors/files';
import pick from 'lodash/pick';

const props = [
    'id',
    'name',
    'storage',
    'path',
    'modified',
    'editState',
    'rev',
    'syncDate',
    'openDate',
    'keyFileName',
    'keyFileHash',
    'opts',
    'backup',
    'fingerprint',
];

export function saveLastFiles() {
    return (dispatch, getState) => {
        const files = getLastFiles(getState()).map(file => pick(file, props));
        return SettingsStore.save('file-info', files);
    };
}
