import React from 'react';
import BetaWarning from './BetaWarning';
import PropTypes from 'prop-types';

const App = ({ env, settings }) => (
    <div className={`app th-${settings.theme}`}>
        {!!env.beta && <BetaWarning />}
    </div>
);

App.propTypes = {
    env: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
};

export default App;
