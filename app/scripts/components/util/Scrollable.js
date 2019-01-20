import React from 'react';
import Baron from 'react-baron/dist/es5';
import PropTypes from 'prop-types';

// TODO: disable on mobile

class Scrollable extends React.Component {
    propTypes = {
        scrollable: PropTypes.bool,
        children: PropTypes.node,
    };

    state = {
        hasScroll: true,
    };

    componentDidMount() {
        this.checkScroll();
    }

    componentDidUpdate(prevProps, prevState) {
        const hasScrollChanged = this.state.hasScroll !== prevState.hasScroll;
        if (!hasScrollChanged) {
            this.checkScroll();
        }
    }

    checkScroll() {
        if (this.baron) {
            const clipper = this.baron.getClipper();
            const scroller = this.baron.getScroller();
            const hasScroll = scroller.scrollHeight > clipper.scrollHeight;
            if (hasScroll !== this.state.hasScroll) {
                this.setState({ hasScroll });
            }
        }
    }

    setBaron = node => {
        this.baron = node;
    };

    render() {
        const { scrollable, children } = this.props;
        const { hasScroll } = this.state;
        return scrollable ? (
            <Baron
                trackCls={`scroller__bar-wrapper ${hasScroll ? '' : 'invisible'}`}
                barCls="scroller__bar"
                ref={this.setBaron}
            >
                {children}
            </Baron>
        ) : (
            children
        );
    }
}

export { Scrollable };
