import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';

class SettingsAbout extends React.Component {
    static propTypes = {
        version: PropTypes.string.isRequired,
    };
    render() {
        const { version } = this.props;
        return (
            <div>
                <h1>
                    <i className="fa fa-info" /> <Res id="setAboutTitle" /> KeeWeb v{version}
                </h1>
            </div>
        );
    }
}

export { SettingsAbout };
