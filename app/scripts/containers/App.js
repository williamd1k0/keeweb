import { connect } from 'react-redux';
import App from 'components/App';

const mapStateToProps = state => {
    return {
        alert: !!state.ui.alert,
        view: state.ui.view,
        isBeta: state.env.isBeta,
        theme: state.settings.theme,
        fontSize: state.settings.fontSize,
    };
};

export default connect(mapStateToProps)(App);
