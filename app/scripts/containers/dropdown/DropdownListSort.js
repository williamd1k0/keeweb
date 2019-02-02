import { connect } from 'react-redux';
import { DropdownMenu } from 'components/dropdown/DropdownMenu';
import { getSortDropdownOptions } from 'selectors/list';
import { toggleDropdown } from 'store/ui/toggle-dropdown';
import { setListSort } from 'store/list/set-list-sort';

const mapStateToProps = state => {
    return {
        options: getSortDropdownOptions(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClick({ value }) {
            dispatch(toggleDropdown());
            dispatch(setListSort(value));
        },
    };
};

const DropdownListSortContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DropdownMenu);

export { DropdownListSortContainer as DropdownListSort };
