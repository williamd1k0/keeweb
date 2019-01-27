import { connect } from 'react-redux';
import { Alert } from 'components/Alert';
import { Timeouts } from 'const/timeouts';
import { removeAlert } from 'logic/ui/alert/remove-alert';

const mapStateToProps = state => {
    const { locale } = state;
    const alert = state.uiAlert;
    let body = alert.body;
    if (typeof body === 'string') {
        body = [body];
    }
    body = body.map(item => ({ text: locale[item] || item }));
    if (alert.error) {
        body.push({ text: alert.error.toString(), pre: true });
    }
    return {
        icon: alert.icon,
        header: locale[alert.header] || alert.header,
        body: body,
        buttons: (alert.buttons || []).map(button => {
            return { ...button, title: locale[button.title] || button.title };
        }),
        enter: alert.enter,
        esc: alert.esc,
        opaque: alert.opaque,
        onButtonClick(e) {
            alert.resolve({ result: e.result });
        },
        onEscPressed() {
            alert.resolve({ result: alert.esc });
        },
        onEnterPressed() {
            alert.resolve({ result: alert.enter });
        },
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onHide() {
            setTimeout(() => dispatch(removeAlert()), Timeouts.AlertHide);
        },
    };
};

const AlertContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Alert);

export { AlertContainer as Alert };
