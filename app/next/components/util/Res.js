import React, { Component } from 'react';
import PropTypes from 'prop-types';
import base from '../../../locales/base.json';

class Res extends Component {
    propTypes = {
        id: PropTypes.string.isRequired
    };
    render ({ id }) {
        return base[id];
    }
}

export default Res;
