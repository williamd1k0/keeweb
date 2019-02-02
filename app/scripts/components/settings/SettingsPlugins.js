import React from 'react';
import { Res } from 'containers/util/Res';

class SettingsPlugins extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    <i className="fa fa-puzzle-piece" /> <Res id="plugins" />
                </h1>
            </div>
        );
    }
}

export { SettingsPlugins };
