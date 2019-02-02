import { connect } from 'react-redux';
import { SettingsFile } from 'components/settings/SettingsFile';
import { getSelectedFile } from 'selectors/settings';

const mapStateToProps = state => {
    return {
        file: getSelectedFile(state),
    };
};

const mapDispatchToProps = () => {
    return {};
};

const SettingsFileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsFile);

export { SettingsFileContainer as SettingsFile };
