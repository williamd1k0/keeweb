import { setFileData } from 'store/files/set-file-data';

export function fileOpened(openData) {
    return dispatch => {
        openData = Object.assign(
            {
                data: undefined,
                keyFileData: undefined,
            },
            openData
        );
        dispatch(setFileData(openData));
    };
}
