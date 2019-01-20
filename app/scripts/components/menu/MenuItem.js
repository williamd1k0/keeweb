import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';

class MenuItem extends React.Component {
    propTypes = {
        locale: PropTypes.object.isRequired,
        title: PropTypes.string.isRequired,
        titleIsText: PropTypes.bool,
        icon: PropTypes.string,
        customIcon: PropTypes.string,
        cls: PropTypes.string,
        capitalize: PropTypes.bool,
        drag: PropTypes.bool,
        collapsible: PropTypes.bool,
        active: PropTypes.bool,
        disabled: PropTypes.bool,
        options: PropTypes.array,
        editable: PropTypes.bool,
        button: PropTypes.object,
        onClick: PropTypes.func.isRequired,
    };
    onMouseOver = e => {
        if (!e.button) {
            e.stopPropagation();
            this.setState({ hover: true });
        }
    };
    onMouseOut = e => {
        e.stopPropagation();
        this.setState({ hover: false });
    };
    onClick = () => {
        this.props.onClick();
    };
    render() {
        const {
            locale,
            title,
            titleIsText,
            icon,
            customIcon,
            cls,
            capitalize,
            drag,
            collapsible,
            active,
            disabled,
            options,
            editable,
            button,
        } = this.props;
        const { hover } = this.state;
        return (
            <div
                className={`menu__item ${active ? 'menu__item--active' : ''} ${
                    disabled ? 'menu__item--disabled' : ''
                } ${options && options.length ? 'menu__item--with-options' : ''} ${
                    hover ? 'menu__item--hover' : ''
                } ${cls || ''}`}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
                onClick={this.onClick}
            >
                {!!collapsible && (
                    <i
                        className="menu__item-collapse fa fa-ellipsis-v muted-color"
                        title={locale.menuItemCollapsed}
                    />
                )}
                <div className="menu__item-body" draggable={!!drag}>
                    {!!drag && <div className="menu__item-drag-top" />}
                    {customIcon ? (
                        <img src={customIcon} className="menu__item-icon menu__item-icon--image" />
                    ) : (
                        <i
                            className={`menu__item-icon fa ${
                                icon ? `fa-${icon}` : 'menu__item-icon--no-icon'
                            }`}
                        />
                    )}
                    <span className="menu__item-title">
                        {titleIsText ? (
                            title
                        ) : (
                            <Res id={title || 'noTitle'} capitalize={capitalize} />
                        )}
                    </span>
                    {!!options && options.length > 0 && (
                        <div className="menu__item-options">
                            {options.map(option => (
                                <div
                                    className={`menu__item-option ${option.cls || ''}`}
                                    data-value={`${option.value}`}
                                    key={option.value}
                                >
                                    {option.title}
                                </div>
                            ))}
                        </div>
                    )}
                    {!!editable && <i className="menu__item-edit fa fa-cog" />}
                    {!!button && (
                        <i
                            className={`fa ${button.cls}`}
                            title={locale[button.title]}
                            tip-placement="right"
                        />
                    )}
                </div>
            </div>
        );
    }
}

export { MenuItem };
