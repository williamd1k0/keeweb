class Entry {
    constructor(kdbxEntry, db, parent) {
        this.kdbxEntry = kdbxEntry;
        this.db = db;
        this.parent = parent;
        this.uuid = kdbxEntry.uuid.id;
        this.id = db.subId(this.uuid);
        this._fieldStrings = {};
    }

    _getFieldString(field) {
        let value = this._fieldStrings[field];
        if (value === undefined) {
            const val = this.kdbxEntry.fields[field];
            if (!val) {
                value = '';
            } else if (val.isProtected) {
                value = val.getText();
            } else {
                value = val.toString();
            }
            this._fieldStrings[field] = value;
        }
        return value;
    }

    get tags() {
        return this.kdbxEntry.tags;
    }

    get fileName() {
        return this.db.name;
    }

    get groupName() {
        return this.parent.get.title;
    }

    get title() {
        return this._getFieldString('Title');
    }
}

export { Entry };
