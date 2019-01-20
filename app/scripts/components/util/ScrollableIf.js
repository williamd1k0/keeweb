import React from 'react';
import Baron from 'react-baron/dist/es5';
import PropTypes from 'prop-types';

const ScrollableIf = ({ scrollable, children }) =>
    scrollable ? (
        <Baron trackCls="scroller__bar-wrapper" barCls="scroller__bar">
            {children}
        </Baron>
    ) : (
        children
    );

ScrollableIf.propTypes = {
    scrollable: PropTypes.bool,
    children: PropTypes.node,
};

export { ScrollableIf };
