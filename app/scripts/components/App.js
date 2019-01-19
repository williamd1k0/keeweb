import React from 'react';
import PropTypes from 'prop-types';
import { BetaWarning } from 'components/BetaWarning';
import { Footer } from 'containers/Footer';
import { Open } from 'containers/Open';
import { Alert } from 'containers/Alert';
import { Menu } from 'components/Menu';
import { MenuDrag } from 'components/MenuDrag';
import { MainSection } from 'components/MainSection';

const App = ({ view, isBeta, alert, theme, fontSize }) => (
    <div
        className={`app th-${theme}`}
        style={{ fontSize: fontSize ? 12 + fontSize * 2 + 'px' : null }}
    >
        {!!isBeta && <BetaWarning />}
        <div className="app__body">
            {view === 'open' && <Open />}
            {view === 'list' && [
                <Menu key="menu" />,
                <MenuDrag key="md" />,
                <MainSection key="main" />,
            ]}
            {view === 'settings' && 'Settings...'}
        </div>
        {view && view !== 'open' && <Footer />}
        {!!alert && <Alert />}
    </div>
);

App.propTypes = {
    view: PropTypes.string.isRequired,
    isBeta: PropTypes.bool.isRequired,
    theme: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
    alert: PropTypes.bool.isRequired,
};

export { App };
