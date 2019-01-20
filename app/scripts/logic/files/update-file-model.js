import { Logger } from 'util/logger';
import { KdbxRepository } from 'api/kdbx-repository';
import { setFileModel } from 'store/files/set-file-model';

export function updateFileModel(id) {
    return (dispatch, getState) => {
        const { files } = getState();
        const file = files.byId[id];
        if (!file) {
            return;
        }
        const kdbx = KdbxRepository.get(file.uuid);
        if (!kdbx) {
            return;
        }
        const logger = new Logger('file', file.name);
        const ts = logger.ts();
        const update = {
            fileId: id,
        };
        dispatch(setFileModel(update));
        logger.info('Updated in ' + logger.ts(ts));
    };
}
