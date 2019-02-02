import { connect } from 'react-redux';
import { SettingsPlugins } from 'components/settings/SettingsPlugins';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

const SettingsPluginsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsPlugins);

export { SettingsPluginsContainer as SettingsPlugins };
