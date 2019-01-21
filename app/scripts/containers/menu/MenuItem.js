import { connect } from 'react-redux';
import { MenuItem } from 'components/menu/MenuItem';
import { showAlert } from 'logic/ui/alert/show-alert';
import { setActiveItem } from 'store/menu/set-active-item';

function getSubGroupItems(item) {
    return item.group.groups
        .map(groupId => {
            const group = item.file.groups[groupId];
            if (group.isRecycleBin) {
                return undefined;
            }
            return {
                id: group.id,
                title: group.title,
                titleIsText: true,
                group: group,
                file: item.file,
            };
        })
        .filter(item => item);
}

const mapStateToProps = (state, props) => {
    const { item, menu } = props;
    return {
        menu: menu,
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
        items: item.group ? getSubGroupItems(item) : null,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showAlert(alert) {
            dispatch(showAlert(alert));
        },
        selectItem(menuId, itemId) {
            dispatch(setActiveItem(menuId, itemId));
        },
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onClick() {
            const { menu, item } = ownProps;
            if (item.alert) {
                dispatchProps.showAlert(item.alert);
            } else {
                dispatchProps.selectItem(menu.id, item.id);
            }
        },
    };
};

const MenuItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(MenuItem);

export { MenuItemContainer as MenuItem };
