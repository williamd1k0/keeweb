import React from 'react';
import { Res } from 'containers/util/Res';

class SettingsHelp extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    <i className="fa fa-question" /> <Res id="help" />
                </h1>
            </div>
        );
    }
}

export { SettingsHelp };
