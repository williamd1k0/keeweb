class Group {
    constructor(kdbxGroup, db, parent, nestingLevel) {
        this.kdbxGroup = kdbxGroup;
        this.db = db;
        this.parent = parent;
        this.nestingLevel = nestingLevel;

        this.uuid = kdbxGroup.uuid.id;
        this.id = db.subId(this.uuid);
        this.title = parent ? kdbxGroup.name : db.name;
        this.titleIsText = true;
        this.expanded = kdbxGroup.expanded !== false;
        this.isRecycleBin = kdbxGroup.uuid.equals(db.kdbxFile.meta.recycleBinUuid);
        this.enableSearching = kdbxGroup.enableSearching;
        this.enableAutoType = kdbxGroup.enableAutoType;
        this.autoTypeSeq = kdbxGroup.defaultAutoTypeSeq;
        this.iconId = kdbxGroup.icon;
        this.customIconId = kdbxGroup.customIcon ? kdbxGroup.customIcon.toString() : null;
    }
}

export { Group };
