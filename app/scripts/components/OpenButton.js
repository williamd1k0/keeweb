import React from 'react';
import PropTypes from 'prop-types';
import Res from 'containers/util/Res';

const OpenButton = ({ button, tabIndex, onClick }) => (
    <div
        data-id={button.id}
        className={`open__icon open__icon-${button.id} ${button.iconSvg ? 'svg-btn' : ''}`}
        tabIndex={tabIndex}
        onClick={onClick}
    >
        {!!button.icon && <i className={`fa fa-${button.icon} open__icon-i`} />}
        {!!button.iconSvg && (
            <div className="open__icon-svg">
                <button.iconSvg width={256} height={256} />
            </div>
        )}
        <div className="open__icon-text">{button.text ? button.text : <Res id={button.res} />}</div>
    </div>
);

OpenButton.propTypes = {
    button: PropTypes.object.isRequired,
    tabIndex: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default OpenButton;
