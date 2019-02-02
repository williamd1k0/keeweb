import { connect } from 'react-redux';
import { SettingsShortcuts } from 'components/settings/SettingsShortcuts';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

const SettingsShortcutsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsShortcuts);

export { SettingsShortcutsContainer as SettingsShortcuts };
