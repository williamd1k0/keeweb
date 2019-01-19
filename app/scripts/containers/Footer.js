import { connect } from 'react-redux';
import { Footer } from 'components/Footer';
import { getOpenFiles } from 'selectors/files';

const mapStateToProps = state => {
    return {
        locale: state.locale,
        files: getOpenFiles(state),
        updateAvailable: false, // TODO
    };
};

const mapDispatchToProps = () => {
    return {};
};

const FooterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);

export { FooterContainer as Footer };
