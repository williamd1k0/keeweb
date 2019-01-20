import { connect } from 'preact-redux';
import { MenuItem } from 'components/menu/MenuItem';
import { getItem } from 'selectors/menu';

const mapStateToProps = (state, props) => {
    const item = getItem(state, props);
    const menu = props.menu;
    const itemId = props.itemId;
    return {
        locale: state.locale,
        title: item.title,
        icon: item.icon,
        cls: item.cls,
        capitalize: item.capitalize,
        button: item.button,
        customIcon: undefined, // TODO
        drag: false, // TODO
        collapsible: false, // TODO
        active: menu.active === itemId,
        disabled: false, // TODO
        options: undefined, // TODO
        editable: false, // TODO
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

const MenuItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuItem);

export { MenuItemContainer as MenuItem };
