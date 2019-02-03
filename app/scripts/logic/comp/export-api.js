import { store } from 'store';
import { updateSettings } from 'logic/settings/update-settings';

const ExportApi = {
    settings: {
        get(key) {
            const settings = store.getState().settings;
            return key ? settings[key] : settings;
        },
        set(key, value) {
            store.dispatch(updateSettings({ [key]: value }));
        },
        del(key) {
            store.dispatch(updateSettings({ [key]: undefined }));
        },
    },
};

export { ExportApi };
