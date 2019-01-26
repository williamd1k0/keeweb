import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';

class ListItem extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        active: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired,
    };
    shouldComponentUpdate(nextProps) {
        const props = this.props;
        if (props.active !== nextProps.active) {
            return true;
        }
        if (props.item === nextProps.item || props.item.entry === nextProps.item.entry) {
            return false;
        }
        return true;
    }
    onClick = () => {
        this.props.onClick({ item: this.props.item });
    };
    render() {
        const { item, active } = this.props;
        const { entry, description } = item;
        const { expired, icon, customIcon, color, title } = entry;
        return (
            <div
                className={`list__item ${active ? 'list__item--active' : ''} ${
                    expired ? 'list__item--expired' : ''
                }`}
                id={item.id}
                draggable="true"
                onClick={this.onClick}
            >
                {customIcon ? (
                    <img
                        src={customIcon}
                        className={`list__item-icon list__item-icon--custom ${color || ''}`}
                    />
                ) : (
                    <i
                        className={`fa fa-${icon} ${color ? `${color}-color` : ''} list__item-icon`}
                    />
                )}
                <span className="list__item-title">{title ? title : <Res id="noTitle" />}</span>
                <span className="list__item-descr thin">{description}</span>
            </div>
        );
    }
}

export { ListItem };
