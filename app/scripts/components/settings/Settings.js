import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';
import { Scrollable } from 'components/util/Scrollable';
import { SettingsGeneral } from 'containers/settings/SettingsGeneral';
import { SettingsShortcuts } from 'containers/settings/SettingsShortcuts';
import { SettingsPlugins } from 'containers/settings/SettingsPlugins';
import { SettingsHelp } from 'containers/settings/SettingsHelp';
import { SettingsAbout } from 'containers/settings/SettingsAbout';
import { SettingsFile } from 'containers/settings/SettingsFile';

const Settings = ({ page, onReturnClick }) => (
    <div className="settings">
        <div className="settings__back-button" onClick={onReturnClick}>
            <i className="fa fa-chevron-left settings__back-button-pre" /> <Res id="retToApp" />{' '}
            <i className="fa fa-external-link-square settings__back-button-post" />
        </div>
        <Scrollable>
            {page === 'general' && <SettingsGeneral />}
            {page === 'shortcuts' && <SettingsShortcuts />}
            {page === 'plugins' && <SettingsPlugins />}
            {page === 'help' && <SettingsHelp />}
            {page === 'about' && <SettingsAbout />}
            {page.startsWith('file') && <SettingsFile />}
        </Scrollable>
    </div>
);

Settings.propTypes = {
    page: PropTypes.string.isRequired,
    onReturnClick: PropTypes.func.isRequired,
};

export { Settings };
