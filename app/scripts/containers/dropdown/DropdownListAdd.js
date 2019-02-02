import { connect } from 'react-redux';
import { DropdownMenu } from 'components/dropdown/DropdownMenu';
import { getAddDropdownOptions } from 'selectors/list';
import { toggleDropdown } from 'store/ui/toggle-dropdown';

const mapStateToProps = state => {
    return {
        options: getAddDropdownOptions(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onClick() {
            dispatch(toggleDropdown());
        },
    };
};

const DropdownListAddContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DropdownMenu);

export { DropdownListAddContainer as DropdownListAdd };
