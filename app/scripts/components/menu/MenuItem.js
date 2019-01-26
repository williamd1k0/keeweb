import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';

class MenuItem extends React.PureComponent {
    static propTypes = {
        locale: PropTypes.object.isRequired,
        item: PropTypes.object.isRequired,
        active: PropTypes.bool,
        menuId: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };
    state = {};
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
    onClick = e => {
        e.stopPropagation();
        this.props.onClick({ menuId: this.props.menuId, item: this.props.item });
    };
    onOptionClick = e => {
        e.stopPropagation();
        const option = e.target.dataset.value;
        this.props.onClick({ menuId: this.props.menuId, item: this.props.item, option });
    };
    render() {
        const { locale, item, active } = this.props;
        const {
            title,
            titleIsLoc,
            icon,
            customIcon,
            cls,
            capitalize,
            drag,
            collapsible,
            disabled,
            options,
            editable,
            button,
            nestingLevel,
        } = item;
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
                data-level={nestingLevel || 0}
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
                        {titleIsLoc ? (
                            <Res id={title || 'noTitle'} capitalize={capitalize} />
                        ) : (
                            title
                        )}
                    </span>
                    {!!options && options.length > 0 && (
                        <div className="menu__item-options">
                            {options.map(option => (
                                <div
                                    className={`menu__item-option ${option.cls || ''}`}
                                    data-value={`${option.value}`}
                                    key={option.value}
                                    onClick={this.onOptionClick}
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
