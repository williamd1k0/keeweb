import React from 'react';
import PropTypes from 'prop-types';
import { Scrollable } from 'components/util/Scrollable';
import { ListItem } from 'components/ListItem';
import { Res } from 'containers/util/Res';

class List extends React.Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        active: PropTypes.string,
        onItemClick: PropTypes.func.isRequired,
    };
    render() {
        const { items, active, onItemClick } = this.props;
        return (
            <div className="list">
                <div className="list__header" />
                <div className="list__items">
                    {items.length ? (
                        <Scrollable scrollable={true}>
                            {items.map(item => (
                                <ListItem
                                    key={item.id}
                                    item={item}
                                    active={active === item.id}
                                    onClick={onItemClick}
                                />
                            ))}
                        </Scrollable>
                    ) : (
                        <div className="empty-block muted-color">
                            <div className="empty-block__icon">
                                <i className="fa fa-key" />
                            </div>
                            <h1 className="empty-block__title">
                                <Res id="listEmptyTitle" />
                            </h1>
                            <p className="empty-block__text">
                                <Res id="listEmptyAdd">
                                    <i key="add" className="fa fa-plus" />
                                </Res>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export { List };
