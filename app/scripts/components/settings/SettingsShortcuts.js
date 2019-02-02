import React from 'react';
import { Res } from 'containers/util/Res';

class SettingsShortcuts extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    <i className="fa fa-keyboard-o" /> <Res id="setShTitle" />
                </h1>
            </div>
        );
    }
}

export { SettingsShortcuts };
