import setAlert from '../../store/ui/set-alert';

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

export default function showAlert(config) {
    return dispatch => {
        if (config.preset) {
            const preset = AlertPresets[config.preset];
            if (preset) {
                config = Object.assign({}, preset, config);
            }
        }
        return new Promise(resolve => {
            config = Object.assign({}, config, { resolve });
            dispatch(setAlert(config));
        });
    };
}
