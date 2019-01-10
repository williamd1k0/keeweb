import React, { Component } from 'react';
import Res from './util/Res';

class BetaWarning extends Component {
    render() {
        return <div className="app__beta">
            <i className="fa fa-exclamation-triangle" /> <Res id="appBeta" />
        </div>;
    }
}

export default BetaWarning;
