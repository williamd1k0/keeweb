import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'containers/menu/MenuItem';

// TODO: scrollable
const MenuSection = ({ grow, drag, scrollable, items }) => (
    <div
        className={`menu__section ${grow ? 'menu__section--grow' : ''} ${
            drag ? 'menu__section--drag' : ''
        } ${scrollable ? 'menu__section--scrollable' : ''}`}
    >
        {items.map(item => (
            <MenuItem item={item} key={item} />
        ))}
    </div>
);

MenuSection.propTypes = {
    grow: PropTypes.bool,
    drag: PropTypes.bool,
    scrollable: PropTypes.bool,
    items: PropTypes.array,
};

export { MenuSection };
