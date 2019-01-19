import { loadFileContent, loadKeyFileContent } from 'logic/ui/open/load-files';

export function loadDroppedFiles(files) {
    return dispatch => {
        const file = files.find(file => /\.kdbx$/i.test(file.name));
        const keyFile = files.find(file => /\.key$/i.test(file.name));
        if (file) {
            dispatch(loadFileContent(file)).then(result => {
                if (result && result.file && keyFile) {
                    return dispatch(loadKeyFileContent(keyFile));
                }
            });
        }
    };
}
