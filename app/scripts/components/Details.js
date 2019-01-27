import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';

class Details extends React.Component {
    static propTypes = {
        entry: PropTypes.object,
    };
    render() {
        const { entry } = this.props;
        if (!entry) {
            return this.renderEmpty();
        }
        const { title } = entry;
        return (
            <div className="details">
                <div className="details__header">
                    <h1 className="details__header-title">{title}</h1>
                </div>
            </div>
        );
    }
    renderEmpty() {
        return (
            <div className="empty-block muted-color">
                <h1 className="empty-block__title">
                    <Res id="detEmpty" />
                </h1>
            </div>
        );
    }
}

export { Details };
