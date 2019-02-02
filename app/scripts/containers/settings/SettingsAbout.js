import { connect } from 'react-redux';
import { SettingsAbout } from 'components/settings/SettingsAbout';

const mapStateToProps = state => {
    return {
        version: state.env.meta.version,
        isDesktop: state.env.isDesktop,
    };
};

const mapDispatchToProps = () => {
    return {};
};

const SettingsAboutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsAbout);

export { SettingsAboutContainer as SettingsAbout };
