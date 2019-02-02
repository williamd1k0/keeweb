import { connect } from 'react-redux';
import { Settings } from 'components/settings/Settings';
import { setView } from 'store/ui/set-view';

const mapStateToProps = state => {
    return {
        page: state.menu.settings.active,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onReturnClick() {
            dispatch(setView('list'));
        },
    };
};

const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);

export { SettingsContainer as Settings };
