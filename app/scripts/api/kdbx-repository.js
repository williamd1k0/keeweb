const repo = {};

const KdbxRepository = {
    add(id, kdbx) {
        if (!id) {
            throw new Error(`Empty ID`);
        }
        if (repo[id]) {
            throw new Error(`Duplicate file with ID ${id}`);
        }
        repo[id] = kdbx;
    },
    get(id) {
        return repo[id];
    },
    remove(id) {
        delete repo[id];
    },
};

export { KdbxRepository };
