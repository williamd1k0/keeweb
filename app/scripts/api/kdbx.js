class Kdbx {
    map = {};
    constructor(file) {
        this.file = file;
        this.uuid = file.getDefaultGroup().uuid.toString();
        this.readModel();
    }
    readModel() {
        this.tags = [];
        this.groups = [];
    }
}

export { Kdbx };
