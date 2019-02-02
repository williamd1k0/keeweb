import { connect } from 'react-redux';
import { SettingsHelp } from 'components/settings/SettingsHelp';
import { getCreateIssueLink } from 'selectors/settings';
import { getAppInfo } from 'selectors/env';

const mapStateToProps = state => {
    return {
        locale: state.locale,
        appInfo: getAppInfo(state),
        createIssueLink: getCreateIssueLink(state),
    };
};

const mapDispatchToProps = () => {
    return {};
};

const SettingsHelpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsHelp);

export { SettingsHelpContainer as SettingsHelp };
