import { connect } from 'react-redux';
import Alert from '../components/Alert';
import KeyHandler from '../logic/comp/key-handler';
import Keys from '../const/keys';
import timeouts from '../const/timeouts';
import removeAlert from '../store/ui/alerts/remove-alert';

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
        onEscPressed() {
            if (typeof alert.esc === 'string') {
                alert.resolve({ result: alert.esc });
            }
        },
        onEnterPressed() {
            if (typeof alert.enter === 'string') {
                alert.resolve({ result: alert.enter });
            }
        },
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onMount() {
            KeyHandler.setModal('alert');
            KeyHandler.onKey(Keys.DOM_VK_ESCAPE, this.onEscPressed, this, undefined, 'alert');
            KeyHandler.onKey(Keys.DOM_VK_RETURN, this.onEnterPressed, this, undefined, 'alert');
        },
        onUnmount() {
            KeyHandler.resetModal();
            KeyHandler.offKey(Keys.DOM_VK_ESCAPE, this.onEscPressed, this);
            KeyHandler.offKey(Keys.DOM_VK_RETURN, this.onEnterPressed, this);
            setTimeout(() => dispatch(removeAlert()), timeouts.AlertHide);
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alert);
