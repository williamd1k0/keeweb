import { connect } from 'preact-redux';
import App from '../components/App';

const mapStateToProps = state => {
    return {
        env: state.env
    };
};

export default connect(
    mapStateToProps
)(App);
