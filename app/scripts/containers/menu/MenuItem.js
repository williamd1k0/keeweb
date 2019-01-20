import { connect } from 'preact-redux';
import { MenuItem } from 'components/menu/MenuItem';
import { getItem } from 'selectors/menu';

const mapStateToProps = (state, props) => {
    const item = getItem(state, props);
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
        active: false, // TODO
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
