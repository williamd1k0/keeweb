import { Logger } from 'util/logger';
import { KdbxRepository } from 'api/kdbx-repository';
import { setFileProps } from 'store/files/set-file-props';
import { fileToModel } from 'logic/files/entities/file';
import { groupToModel } from 'logic/files/entities/group';
import { entryToModel } from 'logic/files/entities/entry';

export function updateFileModel(fileId) {
    return (dispatch, getState) => {
        const { files } = getState();
        const file = files.byId[fileId];
        if (!file) {
            return;
        }
        const kdbx = KdbxRepository.get(file.uuid);
        if (!kdbx) {
            return;
        }

        const logger = new Logger('file', file.name);
        const ts = logger.ts();

        const updatedFile = fileToModel(kdbx, file);
        setGroupsAndEntries(kdbx, file, updatedFile);

        // TODO: custom icons
        // TODO: field references
        // TODO: attachments

        dispatch(setFileProps(updatedFile.id, updatedFile));
        logger.info('Updated in ' + logger.ts(ts), getState());

        finalize(updatedFile);
    };
}

function setGroupsAndEntries(kdbx, oldFile, updatedFile) {
    for (const kdbxGroup of kdbx.groups) {
        processGroup(kdbx, kdbxGroup, oldFile, updatedFile, null, 0);
    }
}

function processGroup(kdbx, kdbxGroup, oldFile, updatedFile, parentUuid, nestingLevel) {
    const groupModel = groupToModel(kdbx, kdbxGroup, updatedFile, parentUuid, nestingLevel);
    updatedFile.groups[groupModel.uuid] = groupModel;

    for (const kdbxEntry of kdbxGroup.entries) {
        const entryModel = entryToModel(kdbx, kdbxEntry, updatedFile, groupModel.uuid);
        updatedFile.entries[entryModel.uuid] = entryModel;
        for (const tag of kdbxEntry.tags) {
            const tagLower = tag.toLowerCase();
            if (!updatedFile.tagMap[tagLower]) {
                updatedFile.tagMap[tagLower] = tag;
                updatedFile.tags.push(tag);
            }
        }
    }
    for (const childGroup of kdbxGroup.groups) {
        processGroup(kdbx, childGroup, updatedFile, updatedFile, groupModel.uuid, nestingLevel + 1);
    }
}

function finalize(updatedFile) {
    console.log(updatedFile);
}
