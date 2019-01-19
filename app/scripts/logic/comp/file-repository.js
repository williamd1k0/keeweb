const files = {};

const FileRepository = {
    add(id, file) {
        if (files[id]) {
            throw new Error(`Duplicate file with ID ${id}`);
        }
        files[id] = file;
    },
    get(id) {
        return files[id];
    },
    remove(id) {
        delete files[id];
    },
};

export { FileRepository };
