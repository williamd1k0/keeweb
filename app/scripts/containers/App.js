import { connect } from 'react-redux';
import { App } from 'components/App';
import { hasActiveFiles } from 'selectors/files';

const mapStateToProps = state => {
    return {
        alert: !!state.uiAlert,
        view: state.ui.view,
        isBeta: state.env.isBeta,
        theme: state.settings.theme,
        fontSize: state.settings.fontSize,
        hasOpenFiles: hasActiveFiles(state),
        menu: state.menu[state.ui.view],
    };
};

const AppContainer = connect(mapStateToProps)(App);

export { AppContainer as App };
