import kdbxweb from 'kdbxweb';
import omit from 'lodash/omit';
import { Logger } from 'util/logger';
import { KdbxRepository } from 'api/kdbx-repository';
import { setFileModel } from 'store/files/set-file-model';
import { Color } from 'util/helpers/color';

const builtInFields = [
    'Title',
    'Password',
    'UserName',
    'URL',
    'Notes',
    'TOTP Seed',
    'TOTP Settings',
    '_etm_template_uuid',
];

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

        const updatedFile = buildFileUpdate(kdbx, file);
        setGroupsAndEntries(kdbx, file, updatedFile);

        // TODO: custom icons
        // TODO: field references
        // TODO: attachments

        dispatch(setFileModel(updatedFile));
        logger.info('Updated in ' + logger.ts(ts));
    };
}

function buildFileUpdate(kdbx, oldFile) {
    return {
        id: oldFile.id,
        name: oldFile.name,
        uuid: kdbx.getDefaultGroup().uuid.id,
        defaultUser: kdbx.meta.defaultUser,
        recycleBinEnabled: kdbx.meta.recycleBinEnabled,
        historyMaxItems: kdbx.meta.historyMaxItems,
        historyMaxSize: kdbx.meta.historyMaxSize,
        keyEncryptionRounds: kdbx.header.keyEncryptionRounds,
        keyChangeForce: kdbx.meta.keyChangeForce,
        kdfParameters: readKdfParams(kdbx),
        groups: {},
        entries: {},
        customIcons: {},
    };
}

function readKdfParams(kdbx) {
    const kdfParameters = kdbx.header.kdfParameters;
    if (!kdfParameters) {
        return undefined;
    }
    let uuid = kdfParameters.get('$UUID');
    if (!uuid) {
        return undefined;
    }
    uuid = kdbxweb.ByteUtils.bytesToBase64(uuid);
    if (uuid !== kdbxweb.Consts.KdfId.Argon2) {
        return undefined;
    }
    return {
        parallelism: kdfParameters.get('P').valueOf(),
        iterations: kdfParameters.get('I').valueOf(),
        memory: kdfParameters.get('M').valueOf(),
    };
}

function getSubId(fileId, entityId) {
    return `${fileId}.${entityId}`;
}

function setGroupsAndEntries(kdbx, oldFile, updatedFile) {
    updatedFile.groups = kdbx.groups.map(gr => gr.uuid.id);
    for (const kdbxGroup of kdbx.groups) {
        processGroup(kdbx, kdbxGroup, oldFile, updatedFile, null);
    }
}

function processGroup(kdbx, kdbxGroup, oldFile, updatedFile, parentUuid) {
    const groupModel = groupToModel(kdbx, kdbxGroup, updatedFile, parentUuid);
    updatedFile.groups[groupModel.uuid] = groupModel;

    for (const kdbxEntry of kdbxGroup.entries) {
        const entryModel = entryToModel(kdbx, kdbxEntry, updatedFile, groupModel.uuid);
        updatedFile.entries[entryModel.uuid] = entryModel;
    }
    for (const childGroup of kdbxGroup.groups) {
        processGroup(kdbx, childGroup, updatedFile, updatedFile, groupModel.uuid);
    }
}

function groupToModel(kdbx, kdbxGroup, file, parentUuid) {
    const isRecycleBin = kdbxGroup.uuid.equals(kdbx.meta.recycleBinUuid);
    return {
        id: getSubId(file.id, kdbxGroup.uuid.id),
        uuid: kdbxGroup.uuid.id,
        fileId: file.id,
        parentUuid: parentUuid,
        groups: kdbxGroup.groups.map(gr => gr.uuid.id),
        entries: kdbxGroup.entries.map(en => en.uuid.id),
        expanded: kdbxGroup.expanded !== false,
        isRecycleBin: isRecycleBin,
        enableSearching: kdbxGroup.enableSearching,
        enableAutoType: kdbxGroup.enableAutoType,
        autoTypeSeq: kdbxGroup.defaultAutoTypeSeq,
        title: parentUuid ? kdbxGroup.name : file.name,
        iconId: kdbxGroup.icon,
        customIconId: kdbxGroup.customIcon ? kdbxGroup.customIcon.toString() : null,
    };
}

function entryToModel(kdbx, kdbxEntry, file, parentUuid) {
    return {
        id: getSubId(file.id, kdbxEntry.uuid.id),
        uuid: kdbxEntry.uuid.id,
        fileId: file.id,
        parentUuid: parentUuid,
        title: getFieldString(kdbxEntry, 'Title'),
        password: kdbxEntry.fields.Password || kdbxweb.ProtectedValue.fromString(''),
        notes: getFieldString(kdbxEntry, 'Notes'),
        url: getFieldString(kdbxEntry, 'URL'),
        user: getFieldString(kdbxEntry, 'UserName'),
        iconId: kdbxEntry.icon,
        tags: kdbxEntry.tags,
        color: colorToModel(kdbxEntry.bgColor) || colorToModel(kdbxEntry.fgColor),
        fields: omit(kdbxEntry.fields, builtInFields),
        created: dateToModel(kdbxEntry.times.creationTime),
        updated: dateToModel(kdbxEntry.times.lastModTime),
        expires: kdbxEntry.times.expires ? dateToModel(kdbxEntry.times.expiryTime) : undefined,
        historyLength: kdbxEntry.history.length,
    };
}

function getFieldString(kdbxEntry, fieldName) {
    const val = kdbxEntry.fields[fieldName];
    if (!val) {
        return '';
    }
    if (val.isProtected) {
        return val.getText();
    }
    return val.toString();
}

function colorToModel(color) {
    return (color && Color.getNearest(color)) || null;
}

function dateToModel(dt) {
    return dt ? dt.getTime() : undefined;
}
