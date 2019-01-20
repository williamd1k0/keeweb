import React from 'react';
import PropTypes from 'prop-types';
import Baron from 'react-baron/dist/es5';
import { MenuItem } from 'containers/menu/MenuItem';

// TODO: scrollable
const MenuSection = ({ menu, grow, drag, scrollable, items }) => (
    <div
        className={`menu__section ${grow ? 'menu__section--grow' : ''} ${
            drag ? 'menu__section--drag' : ''
        } ${scrollable ? 'menu__section--scrollable' : ''}`}
    >
        <Baron trackCls="scroller__bar-wrapper" barCls="scroller__bar">
            {items.map(item => (
                <MenuItem item={item} key={item.id} menu={menu} />
            ))}
        </Baron>
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
