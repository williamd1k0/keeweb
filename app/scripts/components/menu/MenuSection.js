import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'containers/menu/MenuItem';

// TODO: scrollable
const MenuSection = ({ menu, grow, drag, scrollable, items }) => (
    <div
        className={`menu__section ${grow ? 'menu__section--grow' : ''} ${
            drag ? 'menu__section--drag' : ''
        } ${scrollable ? 'menu__section--scrollable' : ''}`}
    >
        {items.map(item => (
            <MenuItem itemId={item} key={item} menu={menu} />
        ))}
    </div>
);

MenuSection.propTypes = {
    menu: PropTypes.object.isRequired,
    grow: PropTypes.bool,
    drag: PropTypes.bool,
    scrollable: PropTypes.bool,
    items: PropTypes.array,
};

export { MenuSection };
