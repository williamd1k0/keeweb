import { connect } from 'react-redux';
import { Footer } from 'components/Footer';
import { getOpenFiles } from 'selectors/files';
import { toggleView } from 'store/ui/toggle-view';

const mapStateToProps = state => {
    return {
        locale: state.locale,
        files: getOpenFiles(state),
        updateAvailable: false, // TODO
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOpenClick() {
            dispatch(toggleView('open', 'list'));
        },
    };
};

const FooterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer);

export { FooterContainer as Footer };
