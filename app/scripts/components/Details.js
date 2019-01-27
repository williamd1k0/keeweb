import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';

class Details extends React.Component {
    static propTypes = {
        entry: PropTypes.object,
    };
    render() {
        const { entry } = this.props;
        const { title } = entry || {};
        return (
            <div className="details">
                {!entry && (
                    <div className="empty-block muted-color">
                        <h1 className="empty-block__title">
                            <Res id="detEmpty" />
                        </h1>
                    </div>
                )}
                {entry && (
                    <div className="details__header">
                        <h1 className="details__header-title">{title}</h1>
                    </div>
                )}
            </div>
        );
    }
}

export { Details };
