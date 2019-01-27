import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Timeouts } from 'const/timeouts';
import { omit } from 'util/helpers/fn';

const ownProps = ['title', 'tagName', 'fast', 'placement'];

class Tooltip extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        title: PropTypes.string,
        placement: PropTypes.string,
        fast: PropTypes.bool,
        tagName: PropTypes.string,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onClick: PropTypes.func,
    };
    state = {
        display: false,
        hideCls: false,
        position: {
            left: '-100vw',
            top: '-100vh',
        },
    };
    componentWillUnmount() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
    }
    componentDidUpdate() {
        if (this.state.wantsReposition) {
            const rect = this.div.getBoundingClientRect();
            const tipRect = this.tipNode.getBoundingClientRect();
            const placement = this.props.placement || this.getAutoPlacement(rect, tipRect);
            let top, left;
            const offset = 10;
            const sideOffset = 10;
            switch (placement) {
                case 'top':
                    top = rect.top - tipRect.height - offset;
                    left = rect.left + rect.width / 2 - tipRect.width / 2;
                    break;
                case 'top-left':
                    top = rect.top - tipRect.height - offset;
                    left = rect.left + rect.width / 2 - tipRect.width + sideOffset;
                    break;
                case 'bottom':
                    top = rect.bottom + offset;
                    left = rect.left + rect.width / 2 - tipRect.width / 2;
                    break;
                case 'left':
                    top = rect.top + rect.height / 2 - tipRect.height / 2;
                    left = rect.left - tipRect.width - offset;
                    break;
                case 'right':
                    top = rect.top + rect.height / 2 - tipRect.height / 2;
                    left = rect.right + offset;
                    break;
            }
            const position = { top, left };
            this.setState({ wantsReposition: false, placement, position });
        }
    }
    show = () => {
        this.showTimeout = null;
        this.setState({ display: true, hideCls: false, wantsReposition: true });
    };
    hide = () => {
        this.hideTimeout = null;
        this.setState({ display: false });
    };
    onMouseEnter = e => {
        if (!this.props.title) {
            return;
        }
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }
        this.showTimeout = setTimeout(this.show, Timeouts.TooltipShow);
        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(e);
        }
    };
    onMouseLeave = e => {
        if (!this.props.title) {
            return;
        }
        this.setState({ hideCls: true });
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
            this.showTimeout = null;
        } else {
            this.hideTimeout = setTimeout(this.hide, Timeouts.TooltipHide);
        }
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(e);
        }
    };
    onClick = e => {
        this.setState({ display: false });
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    };
    getAutoPlacement = (rect, tipRect) => {
        const padding = 20;
        const bodyRect = document.body.getBoundingClientRect();
        const canShowToBottom = bodyRect.bottom - rect.bottom > padding + tipRect.height;
        const canShowToHalfRight = bodyRect.right - rect.right > padding + tipRect.width / 2;
        const canShowToRight = bodyRect.right - rect.right > padding + tipRect.width;
        const canShowToHalfLeft = rect.left > padding + tipRect.width / 2;
        const canShowToLeft = rect.left > padding + tipRect.width;
        if (canShowToBottom) {
            if (canShowToLeft && !canShowToHalfRight) {
                return 'left';
            } else if (canShowToRight && !canShowToHalfLeft) {
                return 'right';
            } else {
                return 'bottom';
            }
        }
        if (canShowToLeft && !canShowToHalfRight) {
            return 'left';
        } else if (canShowToRight && !canShowToHalfLeft) {
            return 'right';
        } else {
            return 'top';
        }
    };
    render() {
        const { title, children, fast } = this.props;
        const { display, hideCls, position, placement } = this.state;
        const TagName = this.props.tagName || 'div';
        const props = omit(this.props, ownProps);
        return (
            <TagName
                {...props}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onClick={this.onClick}
                ref={node => (this.div = node)}
            >
                {children}
                {display &&
                    ReactDOM.createPortal(
                        <div
                            className={`tip ${hideCls ? 'tip--hide' : ''} ${
                                placement ? `tip--${placement}` : ''
                            } ${fast ? 'tip--fast' : ''}`}
                            style={position}
                            ref={node => (this.tipNode = node)}
                        >
                            {title}
                        </div>,
                        document.body
                    )}
            </TagName>
        );
    }
}

export { Tooltip };
