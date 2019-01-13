import Launcher from 'launcher';
import file from 'storage/storage-file';
import fileCache from 'storage/storage-file-cache';
import cache from 'storage/storage-cache';
import dropbox from 'storage/storage-dropbox';
import webdav from 'storage/storage-webdav';
import gdrive from 'storage/storage-gdrive';
import onedrive from 'storage/storage-onedrive';

const BuiltInStorage = {
    file,
    cache: Launcher ? fileCache : cache,
};

const ThirdPartyStorage = {
    dropbox,
    webdav,
    gdrive,
    onedrive,
};

const storage = BuiltInStorage;
if (!Launcher || Launcher.thirdPartyStoragesSupported) {
    Object.assign(storage, ThirdPartyStorage);
}

export default storage;
