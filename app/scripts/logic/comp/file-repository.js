const files = {};

const FileRepository = {
    add(id, file) {
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
