import { connect } from 'preact-redux';
import { MenuItem } from 'components/menu/MenuItem';

const mapStateToProps = (state, props) => {
    const { item, menu } = props;
    return {
        locale: state.locale,
        title: item.title,
        titleIsText: item.titleIsText,
        icon: item.icon,
        cls: item.cls,
        capitalize: item.capitalize,
        button: item.button,
        customIcon: undefined, // TODO
        drag: false, // TODO
        collapsible: false, // TODO
        active: menu.active === item.id,
        disabled: false, // TODO
        options: item.options,
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
