import Launcher from '../logic/comp/launcher';
import file from './storage-file';
import fileCache from './storage-file-cache';
import cache from './storage-cache';
import dropbox from './storage-dropbox';
import webdav from './storage-webdav';
import gdrive from './storage-gdrive';
import onedrive from './storage-onedrive';

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
