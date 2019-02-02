import { connect } from 'react-redux';
import { Settings } from 'components/settings/Settings';
import { setView } from 'store/ui/set-view';
import { getActiveFiles } from 'selectors/files';

const mapStateToProps = state => {
    return {
        files: getActiveFiles(state),
        page: state.menu.settings.active,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setView(view) {
            dispatch(setView(view));
        },
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onReturnClick() {
            dispatchProps.setView(stateProps.files.length ? 'list' : 'open');
        },
    };
};

const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Settings);

export { SettingsContainer as Settings };
