import { connect } from 'react-redux';
import { MenuSection } from 'components/menu/MenuSection';
import { ItemSelectors } from 'selectors/menu';
import { showAlert } from 'logic/ui/alert/show-alert';
import { setMenuSelection } from 'store/menu/set-menu-selection';

const mapStateToProps = (state, props) => {
    const { section } = props;
    const itemSelector = ItemSelectors[section.itemSelector || 'self'];
    return {
        locale: state.locale,
        grow: section.grow,
        drag: section.drag,
        scrollable: section.scrollable,
        items: itemSelector(state, props),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onItemClick({ menuId, item, option }) {
            const filterKey = item.filterKey;
            const filterValue = option || item.filterValue;
            if (item.alert) {
                dispatch(showAlert(item.alert));
            } else {
                dispatch(setMenuSelection(menuId, item.id, option, filterKey, filterValue));
            }
        },
    };
};

const MenuSectionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuSection);

export { MenuSectionContainer as MenuSection };
