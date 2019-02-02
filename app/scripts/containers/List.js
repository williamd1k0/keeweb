import { connect } from 'react-redux';
import { List } from 'components/List';
import { getListItems, getActiveItemId } from 'selectors/list';
import { setActiveListItem } from 'store/list/set-active-list-item';
import { toggleAdvancedSearch } from 'store/list/toggle-advanced-search';
import { setAdvancedSearchOption } from 'store/list/set-advanced-search-option';
import { setListSearch } from 'store/list/set-list-search';
import { toggleDropdown } from 'store/ui/toggle-dropdown';

const mapStateToProps = state => {
    return {
        locale: state.locale,
        search: state.list.search,
        active: getActiveItemId(state),
        advanced: state.list.advanced,
        advancedEnabled: state.list.advancedEnabled,
        items: getListItems(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onItemClick({ item }) {
            dispatch(setActiveListItem(item.id));
        },
        onSearchChange({ value }) {
            dispatch(setListSearch(value));
        },
        onAdvancedSearchClick() {
            dispatch(toggleAdvancedSearch());
        },
        onAdvancedOptionChange({ option, value }) {
            dispatch(setAdvancedSearchOption(option, value));
        },
        onAddClick({ position }) {
            dispatch(toggleDropdown({ id: 'list-add', position }));
        },
        onSortClick({ position }) {
            dispatch(toggleDropdown({ id: 'list-sort', position }));
        },
        onEntrySelectionMoved({ items, active, diff }) {
            let activeIx;
            for (let ix = 0; ix < items.length; ix++) {
                if (items[ix].id === active) {
                    activeIx = ix;
                    break;
                }
            }
            if (activeIx === undefined) {
                activeIx = diff > 0 ? 0 : items.length - 1;
            } else {
                activeIx += diff;
            }
            if (activeIx >= 0 && activeIx < items.length) {
                const activeItem = items[activeIx];
                dispatch(setActiveListItem(activeItem.id));
            }
        },
    };
};

const ListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export { ListContainer as List };
