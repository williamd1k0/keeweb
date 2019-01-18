import kdbxweb from 'kdbxweb';
import showAlert from 'logic/ui/alert/show-alert';
import displayLoadedFile from 'store/ui/open/display-loaded-file';

export default function loadFileContent(file) {
    return dispatch => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = e => {
                const data = e.target.result;
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
                resolve(fileInfo);
            };
            reader.onerror = () => {
                dispatch(showAlert({ header: 'openFailedRead' }));
                resolve();
            };
            reader.readAsArrayBuffer(file);
        }).then(fileInfo => {
            if (fileInfo) {
                return dispatch(displayLoadedFile(fileInfo));
            }
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
