import store from '../../store';
import settingsUpdate from '../settings/update';

const ExportApi = {
    settings: {
        get: function(key) {
            const settings = store.getState().settings;
            return key ? settings[key] : settings;
        },
        set: function(key, value) {
            store.dispatch(settingsUpdate({ [key]: value }));
        },
        del: function(key) {
            store.dispatch(settingsUpdate({ [key]: undefined }));
        },
    },
};

export default ExportApi;
