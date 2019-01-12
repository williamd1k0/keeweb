import { connect } from 'preact-redux';
import App from '../components/App';

const mapStateToProps = state => {
    return {
        env: state.env,
        settings: state.settings,
    };
};

export default connect(mapStateToProps)(App);
