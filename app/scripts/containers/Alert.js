import { connect } from 'preact-redux';
import Alert from '../components/Alert';
import timeouts from '../const/timeouts';
import removeAlert from '../store/ui/remove-alert';

const mapStateToProps = state => {
    const { locale } = state;
    const alert = state.ui.alert;
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
            return Object.assign({}, button, { title: locale[button.title] || button.title });
        }),
        onButtonClick(e) {
            alert.resolve({ result: e.result });
        },
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemove() {
            setTimeout(() => dispatch(removeAlert()), timeouts.AlertHide);
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alert);
