import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'components/menu/MenuItem';
import { Scrollable } from 'components/util/Scrollable';

const MenuSection = ({ locale, menu, grow, drag, scrollable, items, onItemClick }) => (
    <div
        className={`menu__section ${grow ? 'menu__section--grow' : ''} ${
            drag ? 'menu__section--drag' : ''
        } ${scrollable ? 'menu__section--scrollable' : ''}`}
    >
        <Scrollable scrollable={scrollable}>
            {items.map(item => (
                <MenuItem
                    item={item}
                    menuId={menu.id}
                    key={item.id}
                    active={menu.active === item.id}
                    activeOption={menu.activeOption}
                    locale={locale}
                    onClick={onItemClick}
                />
            ))}
        </Scrollable>
        {!!drag && (
            <div className="menu__drag-section">
                <div className="drag-handle__inner" />
            </div>
        )}
    </div>
);

MenuSection.propTypes = {
    locale: PropTypes.object.isRequired,
    menu: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    grow: PropTypes.bool,
    drag: PropTypes.bool,
    scrollable: PropTypes.bool,
    onItemClick: PropTypes.func.isRequired,
};

export { MenuSection };
