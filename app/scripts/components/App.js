import React from 'react';
import BetaWarning from './BetaWarning';
import PropTypes from 'prop-types';
import Footer from '../containers/Footer';
import Open from '../containers/Open';
import Alert from '../containers/Alert';

const App = ({ view, isBeta, alert, theme }) => (
    <div className={`app th-${theme}`}>
        {!!isBeta && <BetaWarning />}
        <div className="app__body">
            {view === 'open' && <Open />}
            {view === 'settings' && 'Settings...'}
        </div>
        <Footer />
        {!!alert && <Alert />}
    </div>
);

App.propTypes = {
    view: PropTypes.string.isRequired,
    isBeta: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
    alert: PropTypes.bool.isRequired,
};

export default App;
