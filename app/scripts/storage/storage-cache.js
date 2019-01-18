import { StorageBase } from 'storage/storage-base';
import { IoBrowserCache } from 'storage/io-browser-cache';
import { Launcher } from 'launcher';

class StorageCache extends StorageBase {
    name = 'cache';
    enabled = !Launcher;
    system = true;

    io = null;

    init(...args) {
        super.init(...args);
        this.io = new IoBrowserCache({
            cacheName: 'FilesCache',
            logger: this.logger,
        });
    }

    save(id, opts, data, callback) {
        this.io.save(id, data, callback);
    }

    load(id, opts, callback) {
        this.io.load(id, callback);
    }

    remove(id, opts, callback) {
        this.io.remove(id, callback);
    }
}

export { StorageCache };
