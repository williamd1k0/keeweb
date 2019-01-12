import React from 'react';
import BetaWarning from './BetaWarning';
import PropTypes from 'prop-types';
import Footer from '../containers/Footer';
import Open from '../containers/Open';

const App = ({ env, settings }) => (
    <div className={`app th-${settings.theme}`}>
        {!!env.isBeta && <BetaWarning />}
        <div className="app__body" />
        <Open />
        <Footer />
    </div>
);

App.propTypes = {
    env: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
};

export default App;
