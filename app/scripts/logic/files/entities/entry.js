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
        parentUuid,

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
        attachments: attachmentsToModel(kdbxEntry.binaries),
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

function attachmentsToModel(binaries) {
    return Object.keys(binaries).map(title => {
        const ext = getAttachmentExtension(title);
        const icon = getAttachmentIcon(ext);
        const mimeType = getAttachmentMimeType(ext);
        return {
            title,
            ext,
            icon,
            mimeType,
        };
    });
}

function getAttachmentExtension(fileName) {
    const ext = fileName ? fileName.split('.').pop() : undefined;
    return ext ? ext.toLowerCase() : undefined;
}

function getAttachmentIcon(ext) {
    switch (ext) {
        case 'txt':
        case 'log':
        case 'rtf':
        case 'pem':
            return 'file-text-o';
        case 'html':
        case 'htm':
        case 'js':
        case 'css':
        case 'xml':
        case 'config':
        case 'json':
        case 'yaml':
        case 'cpp':
        case 'c':
        case 'h':
        case 'cc':
        case 'hpp':
        case 'mm':
        case 'cs':
        case 'php':
        case 'sh':
        case 'py':
        case 'java':
        case 'rb':
        case 'cfg':
        case 'properties':
        case 'yml':
        case 'asm':
        case 'bat':
            return 'file-code-o';
        case 'pdf':
            return 'file-pdf-o';
        case 'zip':
        case 'rar':
        case 'bz':
        case 'bz2':
        case '7z':
        case 'gzip':
        case 'gz':
        case 'tar':
        case 'cab':
        case 'ace':
        case 'dmg':
        case 'jar':
            return 'file-archive-o';
        case 'doc':
        case 'docx':
            return 'file-word-o';
        case 'xls':
        case 'xlsx':
            return 'file-excel-o';
        case 'ppt':
        case 'pptx':
            return 'file-powerpoint-o';
        case 'jpeg':
        case 'jpg':
        case 'png':
        case 'gif':
        case 'bmp':
        case 'tiff':
        case 'svg':
        case 'ico':
        case 'psd':
            return 'file-image-o';
        case 'avi':
        case 'mp4':
        case '3gp':
        case 'm4v':
        case 'mov':
        case 'mpeg':
        case 'mpg':
        case 'mpe':
            return 'file-video-o';
        case 'mp3':
        case 'wav':
        case 'flac':
            return 'file-audio-o';
    }
    return 'file-o';
}

function getAttachmentMimeType(ext) {
    switch (ext) {
        case 'txt':
        case 'log':
        case 'html':
        case 'htm':
        case 'js':
        case 'css':
        case 'xml':
        case 'config':
        case 'json':
        case 'yaml':
        case 'cpp':
        case 'c':
        case 'h':
        case 'cc':
        case 'hpp':
        case 'mm':
        case 'cs':
        case 'php':
        case 'sh':
        case 'py':
        case 'java':
        case 'rb':
        case 'cfg':
        case 'properties':
        case 'yml':
        case 'asm':
        case 'pem':
            return 'text/plain';
        case 'pdf':
            return 'application/pdf';
        case 'jpeg':
        case 'jpg':
        case 'png':
        case 'gif':
        case 'bmp':
        case 'tiff':
        case 'svg':
            return 'image/' + ext;
    }
}
