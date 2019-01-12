import store from '../../store';
import updateSettings from '../settings/update-settings';

const ExportApi = {
    settings: {
        get: function(key) {
            const settings = store.getState().settings;
            return key ? settings[key] : settings;
        },
        set: function(key, value) {
            store.dispatch(updateSettings({ [key]: value }));
        },
        del: function(key) {
            store.dispatch(updateSettings({ [key]: undefined }));
        },
    },
};

export default ExportApi;
