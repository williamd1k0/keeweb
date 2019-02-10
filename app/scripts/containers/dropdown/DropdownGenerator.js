import { connect } from 'react-redux';
import { DropdownGenerator } from 'components/dropdown/DropdownGenerator';
import {
    getActivePresetName,
    getAllPresets,
    getGeneratorOptions,
    lengthFromPseudoValue,
    getGeneratedPassword,
} from 'selectors/generator';
import { setActivePreset } from 'store/generator/set-active-preset';
import { setGeneratorOptions } from 'store/generator/set-generator-options';
import { incrementGeneratorVersion } from 'store/generator/increment-generator-version';
import { omit } from 'util/helpers/fn';
import { copySelectedText } from 'logic/comp/copy-paste';
import { toggleDropdown } from 'store/ui/toggle-dropdown';

const mapStateToProps = state => {
    return {
        locale: state.locale,
        opt: getGeneratorOptions(state),
        presets: getAllPresets(state),
        activePreset: getActivePresetName(state),
        result: getGeneratedPassword(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPresetChange({ preset }) {
            dispatch(setActivePreset(preset));
        },
        setOptions(options) {
            options = omit(options, ['name', 'builtin', 'title', 'titleIsLoc']);
            dispatch(setGeneratorOptions(options));
        },
        onRefreshClick() {
            dispatch(incrementGeneratorVersion());
        },
        onButtonClick({ result }) {
            copySelectedText(result);
            dispatch(toggleDropdown());
        },
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        onLengthChange({ value }) {
            dispatchProps.setOptions({
                ...stateProps.opt,
                length: lengthFromPseudoValue(value),
            });
        },
        onOptionChange({ option, value }) {
            dispatchProps.setOptions({
                ...stateProps.opt,
                [option]: value,
            });
        },
    };
};

const DropdownGeneratorContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(DropdownGenerator);

export { DropdownGeneratorContainer as DropdownGenerator };
