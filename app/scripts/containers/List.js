import { connect } from 'react-redux';
import { List } from 'components/List';
import { getListItems } from 'selectors/list';
import { setActiveListItem } from 'store/list/set-active-list-item';

const mapStateToProps = state => {
    return {
        active: state.list.active,
        items: getListItems(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onItemClick({ item }) {
            dispatch(setActiveListItem(item.id));
        },
    };
};

const ListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List);

export { ListContainer as List };
