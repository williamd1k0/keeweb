import React from 'react';
import PropTypes from 'prop-types';
import { Timeouts } from 'const/timeouts';

// TODO

class Tooltip extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        onMouseClick: PropTypes.func,
    };
    componentWillUnmount() {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
    }
    show = () => {
        this.showTimeout = null;
        this.setState({ visible: true, hideCls: false });
    };
    hide = () => {
        this.hideTimeout = null;
        this.setState({ visible: false });
    };
    onMouseEnter = e => {
        if (this.showTimeout) {
            clearTimeout(this.showTimeout);
        }
        this.showTimeout = setTimeout(this.show, Timeouts.TooltipShow);
        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(e);
        }
    };
    onMouseLeave = e => {
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
        this.setState({ visible: false });
        if (this.props.onMouseClick) {
            this.props.onMouseClick(e);
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
        return (
            <div
                {...this.props}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onClick={this.onClick}
            >
                {this.props.children}
                {this.state.visible && (
                    <div className={`tip ${this.state.hideCls ? 'tip--hide' : ''}`}>TIP</div>
                )}
            </div>
        );
    }
}

export { Tooltip };
