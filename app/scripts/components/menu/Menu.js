import React from 'react';
import PropTypes from 'prop-types';
import { MenuSection } from 'containers/menu/MenuSection';

const Menu = ({ sections }) => (
    <div className="app__menu">
        <div className="menu">
            {sections.map(section => (
                <MenuSection section={section} key={section} />
            ))}
        </div>
    </div>
);

Menu.propTypes = {
    sections: PropTypes.array.isRequired,
};

export { Menu };
