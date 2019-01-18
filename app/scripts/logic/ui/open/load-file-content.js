import kdbxweb from 'kdbxweb';
import { showAlert } from 'logic/ui/alert/show-alert';
import { displayFile } from 'store/ui/open/display-file';

export function loadFileContent(file) {
    return dispatch => {
        loadFile(file)
            .then(data => {
                const isValid = checkFileFormat(data);
                if (!isValid) {
                    return;
                }
                const fileInfo = {
                    name: file.name.replace(/(.+)\.\w+$/i, '$1'),
                    path: file.path || null,
                    storage: file.path ? 'file' : null,
                    rev: null,
                };
                return dispatch(displayFile(fileInfo));
            })
            .catch(() => {
                dispatch(showAlert({ header: 'openFailedRead' }));
            });

        function checkFileFormat(fileData) {
            const fileSig = fileData.byteLength < 8 ? null : new Uint32Array(fileData, 0, 2);
            if (!fileSig || fileSig[0] !== kdbxweb.Consts.Signatures.FileMagic) {
                dispatch(showAlert({ header: 'openWrongFile', body: 'openWrongFileBody' }));
                return false;
            }
            if (fileSig[1] === kdbxweb.Consts.Signatures.Sig2Kdb) {
                dispatch(showAlert({ header: 'openWrongFile', body: 'openKdbFileBody' }));
                return false;
            }
            if (fileSig[1] !== kdbxweb.Consts.Signatures.Sig2Kdbx) {
                dispatch(showAlert({ header: 'openWrongFile', body: 'openWrongFileBody' }));
                return false;
            }
            return true;
        }
    };
}

export function loadKeyFileContent(file) {
    return dispatch => {
        return loadFile(file)
            .then(file => {
                console.log('load', file);
            })
            .catch(() => {
                dispatch(showAlert({ header: 'openFailedRead' }));
            });
    };
}

function loadFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
            const data = e.target.result;
            resolve(data);
        };
        reader.onerror = () => {
            reject();
        };
        reader.readAsArrayBuffer(file);
    });
}
