import { connect } from 'react-redux';
import { Dropdown } from 'components/dropdown/Dropdown';

const mapStateToProps = state => {
    return {
        dropdown: state.ui.dropdown,
    };
};

const mapDispatchToProps = () => {
    return {};
};

const DropdownContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dropdown);

export { DropdownContainer as Dropdown };
