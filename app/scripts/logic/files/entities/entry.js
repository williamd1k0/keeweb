import kdbxweb from 'kdbxweb';
import omit from 'lodash/omit';
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

export function entryToModel(kdbx, kdbxEntry, file, parentUuid) {
    return {
        id: `${file.id}.${kdbxEntry.uuid.id}`,
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
