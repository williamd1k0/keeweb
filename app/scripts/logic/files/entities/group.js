import kdbxweb from 'kdbxweb';
import { IconMap } from 'const/icon-map';
import { toDataUrl } from 'util/text/icon-url';

const KdbxIcons = kdbxweb.Consts.Icons;
const ignoredIcons = [KdbxIcons.Folder, KdbxIcons.FolderOpen];

export function groupToModel(kdbx, kdbxGroup, file, parentUuid, nestingLevel) {
    const isRecycleBin = kdbxGroup.uuid.equals(kdbx.meta.recycleBinUuid);
    const id = `${file.id}.${kdbxGroup.uuid.id}`;
    return {
        id,
        uuid: kdbxGroup.uuid.id,
        fileId: file.id,
        parentUuid,
        nestingLevel,
        filterKey: 'group',
        filterValue: id,
        drag: !!parentUuid,
        editable: true,

        groups: kdbxGroup.groups.map(gr => gr.uuid.id),
        entries: kdbxGroup.entries.map(en => en.uuid.id),

        expanded: kdbxGroup.expanded !== false,
        isRecycleBin,
        isEntryTemplatesGroup: kdbx.meta.entryTemplatesGroup
            ? kdbxGroup.uuid.equals(kdbx.meta.entryTemplatesGroup)
            : false,
        enableSearching: kdbxGroup.enableSearching,
        enableAutoType: kdbxGroup.enableAutoType,
        autoTypeSeq: kdbxGroup.defaultAutoTypeSeq,
        title: parentUuid ? kdbxGroup.name : file.name,
        iconId: kdbxGroup.icon,
        icon: iconFromId(kdbxGroup.icon),
        customIconId: kdbxGroup.customIcon ? kdbxGroup.customIcon.toString() : null,
        customIcon: buildCustomIcon(kdbxGroup.customIcon, kdbx),
    };
}

function iconFromId(id) {
    if (ignoredIcons.includes(id)) {
        return undefined;
    }
    return IconMap[id];
}

function buildCustomIcon(customIcon, kdbx) {
    return customIcon ? toDataUrl(kdbx.meta.customIcons[customIcon]) : null;
}
