import kdbxweb from 'kdbxweb';
import { omit } from 'util/helpers/fn';
import { IconMap } from 'const/icon-map';
import { Color } from 'util/helpers/color';
import { toDataUrl } from 'util/text/icon-url';

const urlRegex = /^https?:\/\//i;

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

export function entryToModel(kdbx, kdbxEntry, file, parentUuid, now) {
    return {
        id: `${file.id}.${kdbxEntry.uuid.id}`,
        uuid: kdbxEntry.uuid.id,
        fileId: file.id,
        parentUuid: parentUuid,

        title: getFieldString(kdbxEntry, 'Title'),
        password: kdbxEntry.fields.Password || kdbxweb.ProtectedValue.fromString(''),
        notes: getFieldString(kdbxEntry, 'Notes'),
        url: getFieldString(kdbxEntry, 'URL'),
        displayUrl: getDisplayUrl(getFieldString(kdbxEntry, 'URL')),
        user: getFieldString(kdbxEntry, 'UserName'),
        iconId: kdbxEntry.icon,
        icon: IconMap[kdbxEntry.icon],
        tags: kdbxEntry.tags,
        tagsLower: kdbxEntry.tags.map(tag => tag.toLowerCase()),
        color: colorToModel(kdbxEntry.bgColor) || colorToModel(kdbxEntry.fgColor),
        allFields: { ...kdbxEntry.fields },
        fields: omit(kdbxEntry.fields, builtInFields),
        searchText: buildSearchText(kdbxEntry),
        customIconId: kdbxEntry.customIcon ? kdbxEntry.customIcon.toString() : null,
        customIcon: buildCustomIcon(kdbxEntry.customIcon, kdbx),

        created: dateToModel(kdbxEntry.times.creationTime),
        updated: dateToModel(kdbxEntry.times.lastModTime),
        expires: kdbxEntry.times.expires ? dateToModel(kdbxEntry.times.expiryTime) : undefined,
        expired: kdbxEntry.times.expires && kdbxEntry.times.expiryTime <= now,
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

function getDisplayUrl(url) {
    if (!url) {
        return '';
    }
    return url.replace(urlRegex, '');
}

function colorToModel(color) {
    return (color && Color.getNearest(color)) || null;
}

function dateToModel(dt) {
    return dt ? dt.getTime() : undefined;
}

function buildSearchText(kdbxEntry) {
    let text = '';
    for (const value of Object.values(kdbxEntry.fields)) {
        if (typeof value === 'string') {
            text += value.toLowerCase() + '\n';
        }
    }
    for (const tag of kdbxEntry.tags) {
        text += tag.toLowerCase() + '\n';
    }
    for (const attTitle of Object.keys(kdbxEntry.binaries)) {
        text += attTitle.toLowerCase() + '\n';
    }
    return text;
}

function buildCustomIcon(customIcon, kdbx) {
    return customIcon ? toDataUrl(kdbx.meta.customIcons[customIcon]) : null;
}
