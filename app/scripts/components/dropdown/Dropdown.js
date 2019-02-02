import React from 'react';
import PropTypes from 'prop-types';
import { DropdownListSort } from 'containers/dropdown/DropdownListSort';

class Dropdown extends React.Component {
    static propTypes = {
        dropdown: PropTypes.object.isRequired,
    };
    state = {
        wantsReposition: true,
        position: {
            left: '-100vw',
            top: '-100vh',
        },
    };
    constructor(props) {
        super(props);
    }
    setEl = el => {
        this.el = el;
        if (el && this.state.wantsReposition) {
            const referencePosition = this.props.dropdown.position;
            const rect = el.getBoundingClientRect();
            const position = {};
            if (referencePosition.left) {
                position.left = referencePosition.left;
            } else if (referencePosition.right) {
                position.left = referencePosition.right - rect.width;
            }
            if (referencePosition.top) {
                position.top = referencePosition.top;
            } else if (referencePosition.bottom) {
                position.top = referencePosition.bottom - rect.height;
            }
            this.setState({
                wantsReposition: false,
                position,
            });
        }
    };
    render() {
        const { position } = this.state;
        const { dropdown } = this.props;
        return (
            <div className="dropdown" style={position} ref={this.setEl}>
                {dropdown.id === 'list-sort' && <DropdownListSort />}
            </div>
        );
    }
}

export { Dropdown };
