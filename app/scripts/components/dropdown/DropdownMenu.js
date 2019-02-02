import React from 'react';
import PropTypes from 'prop-types';

class DropdownMenu extends React.Component {
    static propTypes = {
        options: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
    };
    onClick = e => {
        const itemEl = e.target.closest('.dropdown__item');
        this.props.onClick({ value: itemEl.dataset.value });
    };
    render() {
        const { options } = this.props;
        return (
            <>
                {options.map(option => (
                    <div
                        key={option.value}
                        className={`dropdown__item ${
                            option.active ? 'dropdown__item--active' : ''
                        }`}
                        data-value={option.value}
                        onClick={this.onClick}
                    >
                        <i className={`fa fa-${option.icon} dropdown__item-icon`} />
                        <span className="dropdown__item-text">
                            {option.text}
                            {!!option.extraText && (
                                <span className="muted-color">&nbsp;{option.extraText}</span>
                            )}
                        </span>
                    </div>
                ))}
            </>
        );
    }
}

export { DropdownMenu };
