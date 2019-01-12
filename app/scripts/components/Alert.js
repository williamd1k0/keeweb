import React from 'react';
import PropTypes from 'prop-types';

class Alert extends React.Component {
    propTypes = {
        header: PropTypes.string.isRequired,
        body: PropTypes.array.isRequired,
        icon: PropTypes.string.isRequired,
        checkbox: PropTypes.string,
        buttons: PropTypes.array.isRequired,
        opaque: PropTypes.bool,
        hidden: PropTypes.bool,
        onButtonClick: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
    };
    componentDidMount() {
        setTimeout(() => {
            this.setState({ visible: true });
        }, 0);
    }
    componentWillUnmount() {
        this.setState({ visible: false });
    }
    hide() {
        this.setState({ visible: false });
        this.props.onRemove();
    }
    onButtonClick = e => {
        const result = e.target.closest('[data-result]').dataset.result;
        this.props.onButtonClick({ result });
        this.hide();
    };
    render() {
        const { header, body, icon, checkbox, buttons, opaque } = this.props;
        const { visible } = this.state;
        return (
            <div
                className={`modal ${visible ? '' : 'modal--hidden'} ${
                    opaque ? 'modal--opaque' : ''
                }`}
            >
                <div className="modal__content">
                    <i className={`modal__icon fa fa-${icon}`} />
                    <div className="modal__header">{header}</div>
                    <div className="modal__body">
                        {body.map((item, ix) => {
                            if (item.pre) {
                                return <pre key={ix}>{item.text}</pre>;
                            }
                            return <p key={ix}>{item.text}</p>;
                        })}
                        {!!checkbox && (
                            <div className="modal__check-wrap">
                                <input type="checkbox" id="modal__check" />
                                <label htmlFor="modal__check">{checkbox}</label>
                            </div>
                        )}
                    </div>
                    <div className="modal__buttons">
                        {buttons.map(btn => (
                            <button
                                className={`${!btn.result || btn.error ? 'btn-error' : ''} ${
                                    btn.silent ? 'btn-silent' : ''
                                }`}
                                data-result={btn.result}
                                key={btn.result}
                                onClick={this.onButtonClick}
                            >
                                {btn.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Alert;
