import { connect } from 'react-redux';
import { Footer } from 'components/Footer';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

const FooterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);

export { FooterContainer as Footer };
