import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';

const options = [
    { id: 'upper', text: 'ABC' },
    { id: 'lower', text: 'abc' },
    { id: 'digits', text: '123' },
    { id: 'special', text: '!@#' },
    { id: 'brackets', text: '({>' },
    { id: 'high', text: 'äæ±' },
    { id: 'ambiguous', text: '0Oo' },
];

class DropdownGenerator extends React.Component {
    static propTypes = {
        locale: PropTypes.object.isRequired,
        opt: PropTypes.object.isRequired,
        presets: PropTypes.array.isRequired,
        activePreset: PropTypes.string,
        result: PropTypes.string.isRequired,
        onOptionChange: PropTypes.func.isRequired,
        onPresetChange: PropTypes.func.isRequired,
        onLengthChange: PropTypes.func.isRequired,
        onRefreshClick: PropTypes.func.isRequired,
        onButtonClick: PropTypes.func.isRequired,
    };
    constructor(props) {
        super(props);
        this.resultNode = React.createRef();
    }
    onPresetChange = e => {
        const preset = e.target.value;
        this.props.onPresetChange({ preset });
    };
    onOptionChange = e => {
        const value = e.target.checked;
        const option = e.target.dataset.id;
        this.props.onOptionChange({ option, value });
    };
    onLengthChange = e => {
        const value = e.target.value;
        this.props.onLengthChange({ value });
    };
    onButtonClick = () => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(this.resultNode.current);
        selection.removeAllRanges();
        selection.addRange(range);

        const result = this.props.result;
        this.props.onButtonClick({ result });
    };
    render() {
        const { opt, locale, presets, activePreset, result, onRefreshClick } = this.props;
        return (
            <div className="gen">
                <div>
                    <Res id="genLen" />: <span className="gen__length-range-val">{opt.length}</span>
                    <i
                        className="fa fa-refresh gen__btn-refresh"
                        title={locale.genNewPass}
                        onClick={onRefreshClick}
                    />
                </div>
                <select
                    className="gen__sel-tpl input-base"
                    value={activePreset || ''}
                    onChange={this.onPresetChange}
                >
                    {!activePreset && <option value="" />}
                    {presets.map(preset => (
                        <option value={preset.name} key={preset.name}>
                            {preset.titleIsLoc ? locale[preset.title] : preset.title}
                        </option>
                    ))}
                    <option value="...">...</option>
                </select>
                <input
                    type="range"
                    className="gen__length-range"
                    min="0"
                    max="25"
                    value={opt.pseudoLength}
                    onChange={this.onLengthChange}
                />
                <div>
                    {options.map(option => (
                        <div className="gen__check" key={option.id}>
                            <input
                                type="checkbox"
                                id={`gen__check-${option.id}`}
                                data-id={option.id}
                                checked={!!opt[option.id]}
                                onChange={this.onOptionChange}
                            />
                            <label htmlFor={`gen__check-${option.id}`}>{option.text}</label>
                        </div>
                    ))}
                </div>
                <div className="gen__result" ref={this.resultNode}>
                    {result}
                </div>
                <div className="gen__btn-wrap">
                    <button className="gen__btn-ok" onClick={this.onButtonClick}>
                        <Res id="alertCopy" />
                    </button>
                </div>
            </div>
        );
    }
}

export { DropdownGenerator };
