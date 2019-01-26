export function groupToModel(kdbx, kdbxGroup, file, parentUuid, nestingLevel) {
    const isRecycleBin = kdbxGroup.uuid.equals(kdbx.meta.recycleBinUuid);
    return {
        id: `${file.id}.${kdbxGroup.uuid.id}`,
        uuid: kdbxGroup.uuid.id,
        fileId: file.id,
        parentUuid: parentUuid,
        nestingLevel: nestingLevel,

        groups: kdbxGroup.groups.map(gr => gr.uuid.id),
        entries: kdbxGroup.entries.map(en => en.uuid.id),

        expanded: kdbxGroup.expanded !== false,
        isRecycleBin: isRecycleBin,
        enableSearching: kdbxGroup.enableSearching,
        enableAutoType: kdbxGroup.enableAutoType,
        autoTypeSeq: kdbxGroup.defaultAutoTypeSeq,
        title: parentUuid ? kdbxGroup.name : file.name,
        titleIsText: true,
        iconId: kdbxGroup.icon,
        customIconId: kdbxGroup.customIcon ? kdbxGroup.customIcon.toString() : null,
    };
}
