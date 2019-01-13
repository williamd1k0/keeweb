import React from 'react';
import Res from 'containers/util/Res';

const BetaWarning = () => (
    <div className="app__beta">
        <i className="fa fa-exclamation-triangle" /> <Res id="appBeta" />
    </div>
);

export default BetaWarning;
