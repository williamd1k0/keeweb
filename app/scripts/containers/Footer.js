import { connect } from 'react-redux';
import { Footer } from 'components/Footer';
import { getActiveFiles } from 'selectors/files';
import { toggleView } from 'store/ui/toggle-view';
import { setView } from 'store/ui/set-view';
import { setMenuSelection } from 'store/menu/set-menu-selection';
import { toggleDropdown } from 'store/ui/toggle-dropdown';

const mapStateToProps = state => {
    return {
        view: state.ui.view,
        settingsPage: state.menu.settings.active,
        locale: state.locale,
        files: getActiveFiles(state),
        updateAvailable: false, // TODO
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGeneratorClick({ position }) {
            dispatch(toggleDropdown({ id: 'generator', position }));
        },
        onOpenClick() {
            dispatch(toggleView('open', 'list'));
        },
        showList() {
            dispatch(setView('list'));
        },
        showSettings(settingsPage) {
            dispatch(setMenuSelection('settings', settingsPage));
            dispatch(setView('settings'));
        },
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onFileClick({ id }) {
            toggleSettings(stateProps, dispatchProps, `file.${id}`);
        },
        onHelpClick() {
            toggleSettings(stateProps, dispatchProps, 'help');
        },
        onSettingsClick() {
            toggleSettings(stateProps, dispatchProps, 'general');
        },
    };
};

function toggleSettings(stateProps, dispatchProps, settingsPage) {
    if (stateProps.view === 'settings' && stateProps.settingsPage === settingsPage) {
        dispatchProps.showList();
    } else {
        dispatchProps.showSettings(settingsPage);
    }
}

const FooterContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Footer);

export { FooterContainer as Footer };
