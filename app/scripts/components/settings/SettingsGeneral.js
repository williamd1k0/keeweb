import React from 'react';
import { Res } from 'containers/util/Res';

class SettingsGeneral extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    <i className="fa fa-cog" /> <Res id="setGenTitle" />
                </h1>
            </div>
        );
    }
}

export { SettingsGeneral };
