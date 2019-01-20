import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'containers/menu/MenuItem';
import { Scrollable } from 'components/util/Scrollable';

const MenuSection = ({ menu, grow, drag, scrollable, items }) => (
    <div
        className={`menu__section ${grow ? 'menu__section--grow' : ''} ${
            drag ? 'menu__section--drag' : ''
        } ${scrollable ? 'menu__section--scrollable' : ''}`}
    >
        <Scrollable scrollable={scrollable}>
            {items.map(item => (
                <MenuItem item={item} key={item.id} menu={menu} />
            ))}
        </Scrollable>
    </div>
);

MenuSection.propTypes = {
    menu: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    grow: PropTypes.bool,
    drag: PropTypes.bool,
    scrollable: PropTypes.bool,
};

export { MenuSection };
