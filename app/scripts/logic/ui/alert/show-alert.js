import { setAlert } from 'store/ui/alert/set-alert';
import { Logger } from 'util/logger';

const logger = new Logger('alerts');

const DefaultButtons = {
    ok: {
        result: 'yes',
        get title() {
            return 'alertOk';
        },
    },
    yes: {
        result: 'yes',
        get title() {
            return 'alertYes';
        },
    },
    no: {
        result: '',
        get title() {
            return 'alertNo';
        },
    },
    cancel: {
        result: '',
        get title() {
            return 'alertCancel';
        },
    },
};

const AlertPresets = {
    notImplemented: {
        header: 'notImplemented',
        body: '',
        icon: 'exclamation-triangle',
        buttons: [DefaultButtons.ok],
        esc: '',
        click: '',
        enter: '',
    },
    info: {
        header: '',
        body: '',
        icon: 'info',
        buttons: [DefaultButtons.ok],
        esc: '',
        click: '',
        enter: '',
    },
    error: {
        header: '',
        body: '',
        icon: 'exclamation-circle',
        buttons: [DefaultButtons.ok],
        esc: '',
        click: '',
        enter: '',
    },
    fatalError: {
        icon: 'exclamation-circle',
        esc: false,
        enter: false,
        click: false,
        buttons: [],
        opaque: true,
    },
    yesno: {
        header: '',
        body: '',
        icon: 'question',
        buttons: [DefaultButtons.yes, DefaultButtons.no],
        esc: '',
        click: '',
        enter: 'yes',
    },
};

export function showAlert(config) {
    return (dispatch, getState) => {
        // TODO: alert stack?
        const state = getState();
        if (state.uiAlert) {
            logger.error('Cannot display alert: another alert is displayed', config);
            throw new Error('Error displaying alert');
        }
        const preset = AlertPresets[config.preset] || AlertPresets.error;
        if (preset) {
            config = Object.assign({}, preset, config);
        }
        return new Promise(resolve => {
            config = Object.assign({}, config, { resolve });
            dispatch(setAlert(config));
        });
    };
}
