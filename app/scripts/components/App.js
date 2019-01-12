import React from 'react';
import BetaWarning from './BetaWarning';
import PropTypes from 'prop-types';
import Footer from '../containers/Footer';
import Open from '../containers/Open';
import { UiViewOpen, UiViewSettings } from '../store/ui';

const App = ({ view, isBeta, theme }) => (
    <div className={`app th-${theme}`}>
        {!!isBeta && <BetaWarning />}
        <div className="app__body">
            {view === UiViewOpen && <Open />}
            {view === UiViewSettings && 'Settings...'}
        </div>
        <Footer />
    </div>
);

App.propTypes = {
    view: PropTypes.string.isRequired,
    isBeta: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
};

export default App;
