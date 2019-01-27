import { Launcher } from 'launcher';
import { StorageFile } from 'storage/storage-file';
import { StorageFileCache } from 'storage/storage-file-cache';
import { StorageCache } from 'storage/storage-cache';
import { StorageDropbox } from 'storage/storage-dropbox';
import { StorageWebDav } from 'storage/storage-webdav';
import { StorageGDrive } from 'storage/storage-gdrive';
import { StorageOneDrive } from 'storage/storage-onedrive';

const BuiltInStorage = {
    file: new StorageFile(),
    cache: Launcher ? new StorageFileCache() : new StorageCache(),
};

const ThirdPartyStorage = {
    dropbox: new StorageDropbox(),
    webdav: new StorageWebDav(),
    gdrive: new StorageGDrive(),
    onedrive: new StorageOneDrive(),
};

let Storage;
if (!Launcher || Launcher.thirdPartyStoragesSupported) {
    Storage = { ...BuiltInStorage, ...ThirdPartyStorage };
} else {
    Storage = BuiltInStorage;
}

export function initAllStorageProviders(dispatch, getState) {
    for (const storage of Object.values(Storage)) {
        storage.init(dispatch, getState);
    }
}

export { Storage };
