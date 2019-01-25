class Entry {
    constructor(kdbxEntry, db, parent) {
        this.kdbxEntry = kdbxEntry;
        this.db = db;
        this.parent = parent;

        this.uuid = kdbxEntry.uuid.id;
        this.id = db.subId(this.uuid);
        this.tags = kdbxEntry.tags;
    }
}

export { Entry };
