import { connect } from 'react-redux';
import { SettingsGeneral } from 'components/settings/SettingsGeneral';

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

const SettingsGeneralContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsGeneral);

export { SettingsGeneralContainer as SettingsGeneral };
