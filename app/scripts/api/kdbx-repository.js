const repo = {};

const KdbxRepository = {
    add(uuid, kdbx) {
        if (!uuid) {
            throw new Error(`Empty UUID`);
        }
        if (repo[uuid]) {
            throw new Error(`Duplicate file with UUID ${uuid}`);
        }
        repo[uuid] = kdbx;
    },
    get(uuid) {
        return repo[uuid];
    },
    remove(uuid) {
        delete repo[uuid];
    },
};

export { KdbxRepository };
