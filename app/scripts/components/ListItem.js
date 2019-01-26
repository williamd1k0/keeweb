import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';

const ListItem = ({ id, active, expired, customIcon, color, title, description }) => (
    <div
        className={`list__item ${active ? 'list__item--active' : ''} ${
            expired ? 'list__item--expired' : ''
        }`}
        id={id}
        draggable="true"
    >
        {customIcon ? (
            <img
                src={customIcon}
                className={`list__item-icon list__item-icon--custom ${color ? 'color' : ''}`}
            />
        ) : (
            <i className="fa fa-{{icon}} {{#if color}}{{color}}-color{{/if}} list__item-icon" />
        )}
        <span className="list__item-title">{title ? title : <Res id="noTitle" />}</span>
        <span className="list__item-descr thin">{description}</span>
    </div>
);

ListItem.propTypes = {};

export { ListItem };
