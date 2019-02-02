import { connect } from 'react-redux';
import { SettingsHelp } from 'components/settings/SettingsHelp';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

const SettingsHelpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsHelp);

export { SettingsHelpContainer as SettingsHelp };
