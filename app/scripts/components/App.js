import React from 'react';
import BetaWarning from './BetaWarning';
import PropTypes from 'prop-types';

const App = ({ env }) => (
    <div className="app th-fb">
        {!!env.beta && <BetaWarning/>}
    </div>
);

App.propTypes = {
    env: PropTypes.element.isRequired,
};

export default App;
