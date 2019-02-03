import { connect } from 'react-redux';
import { DropdownGenerator } from 'components/dropdown/DropdownGenerator';

const mapStateToProps = state => {
    return {
        locale: state.locale,
        opt: { pseudoLength: 1 },
        presets: [],
        preset: undefined,
    };
};

const mapDispatchToProps = () => {
    return {
        onPresetChange({ preset }) {
            console.log(preset);
        },
        onLengthChange({ value }) {
            console.log(value);
        },
        onOptionChange({ option, checked }) {
            console.log(option, checked);
        },
    };
};

const DropdownGeneratorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DropdownGenerator);

export { DropdownGeneratorContainer as DropdownGenerator };
