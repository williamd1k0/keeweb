import Launcher from './launcher';
import store from '../../store';
import showAlert from '../ui/show-alert';

const LocalStorageKeyName = 'instanceCheck';
const LocalStorageResponseKeyName = 'instanceMaster';

const instanceKey = Date.now().toString();

const SingleInstanceChecker = {
    init: function() {
        if (Launcher) {
            return;
        }
        window.addEventListener('storage', SingleInstanceChecker.storageChanged);
        SingleInstanceChecker.setKey(LocalStorageKeyName, instanceKey);
    },

    storageChanged: function(e) {
        if (!e.newValue) {
            return;
        }
        if (e.key === LocalStorageKeyName && e.newValue !== instanceKey) {
            SingleInstanceChecker.setKey(
                LocalStorageResponseKeyName,
                instanceKey + Math.random().toString()
            );
        } else if (e.key === LocalStorageResponseKeyName && e.newValue.indexOf(instanceKey) < 0) {
            window.removeEventListener('storage', SingleInstanceChecker.storageChanged);
            SingleInstanceChecker.showSecondInstanceAlert();
        }
    },

    setKey: function(key, value) {
        try {
            localStorage.setItem(key, value);
            setTimeout(() => {
                localStorage.removeItem(key);
            }, 100);
        } catch (e) {
            // doesn't matter
        }
    },

    showSecondInstanceAlert() {
        store.dispatch(
            showAlert({
                preset: 'error',
                header: 'appTabWarn',
                body: 'appTabWarnBody',
                esc: false,
                enter: false,
                click: false,
                buttons: [],
            })
        );
    },
};

export default SingleInstanceChecker;
