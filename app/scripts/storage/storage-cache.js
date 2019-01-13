import StorageBase from './storage-base';
import IoBrowserCache from './io-browser-cache';
import Launcher from '../logic/comp/launcher';

class StorageCache extends StorageBase {
    name = 'cache';
    enabled = !Launcher;
    system = true;

    io = null;

    init() {
        super.init();
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

export default new StorageCache();
