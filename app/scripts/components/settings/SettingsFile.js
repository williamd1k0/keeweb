import React from 'react';
import PropTypes from 'prop-types';

class SettingsFile extends React.Component {
    static propTypes = {
        file: PropTypes.object.isRequired,
    };
    render() {
        const { file } = this.props;
        return (
            <div>
                <h1>
                    <i className="fa fa-lock" /> {file.name}
                </h1>
            </div>
        );
    }
}

export { SettingsFile };
