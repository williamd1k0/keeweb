import React from 'react';
import PropTypes from 'prop-types';
import { capFirst } from 'util/text/format';

class Res extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        locale: PropTypes.object.isRequired,
        capitalize: PropTypes.bool,
        children: PropTypes.any,
    };
    shouldComponentUpdate(nextProps) {
        return this.props.id !== nextProps.id || this.props.locale !== nextProps.locale;
    }
    render() {
        const { id, locale, capitalize } = this.props;
        let { children } = this.props;
        let translation = locale[id];
        if (capitalize) {
            translation = capFirst(translation);
        }
        const parts = translation.split('{}');
        if (parts.length <= 1) {
            return translation;
        }
        const ret = [];
        if (parts.length === 2 && !(children instanceof Array)) {
            children = [children];
        }
        parts.forEach((part, ix) => {
            if (ix > 0) {
                ret.push(children[ix - 1]);
            }
            ret.push(part);
        });
        return ret;
    }
}

export { Res };
