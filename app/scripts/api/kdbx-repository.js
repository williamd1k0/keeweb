const repo = {};

const KdbxRepository = {
    add(kdbx) {
        if (!kdbx.uuid) {
            throw new Error(`Empty UUID`);
        }
        if (repo[kdbx.uuid]) {
            throw new Error(`Duplicate file with UUID ${kdbx.uuid}`);
        }
        repo[kdbx.uuid] = kdbx;
    },
    get(uuid) {
        return repo[uuid];
    },
    remove(uuid) {
        delete repo[uuid];
    },
};

export { KdbxRepository };
