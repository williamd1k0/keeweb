import { connect } from 'react-redux';
import { Launcher } from 'launcher';
import { SettingsShortcuts } from 'components/settings/SettingsShortcuts';
import {
    getActionShortcutSymbol,
    getAltShortcutSymbol,
    getGlobalShortcutSymbol,
    globalShortcutTextIsLong,
} from 'selectors/env';

const mapStateToProps = state => {
    return {
        cmd: getActionShortcutSymbol(state),
        alt: getAltShortcutSymbol(state),
        global: getGlobalShortcutSymbol(state),
        globalIsLong: globalShortcutTextIsLong(state),
        globalShortcutsSupported: !!Launcher,
        autoTypeSupported: !!Launcher,
    };
};

const mapDispatchToProps = () => {
    return {};
};

const SettingsShortcutsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsShortcuts);

export { SettingsShortcutsContainer as SettingsShortcuts };
