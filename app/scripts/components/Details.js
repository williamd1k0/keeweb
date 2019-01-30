import React from 'react';
import PropTypes from 'prop-types';
import { Colors } from 'const/colors';
import { Res } from 'containers/util/Res';
import { Tooltip } from 'components/util/Tooltip';
import { Scrollable } from 'components/util/Scrollable';
import { DetailsFields } from 'components/det/DetailsFields';
import { DetailsAside } from 'components/det/DetailsAside';

class Details extends React.Component {
    static propTypes = {
        locale: PropTypes.object.isRequired,
        entry: PropTypes.object,
        group: PropTypes.object,
        file: PropTypes.object,
    };
    render() {
        const { locale, entry, group, file } = this.props;
        if (!entry) {
            return this.renderEmpty();
        }
        const { title, customIcon, icon, deleted, attachments, color } = entry;
        return (
            <div className="details">
                <div className="details__back-button">
                    <i className="fa fa-chevron-left" /> <Res id="detBackToList" />
                </div>
                <div className="details__header">
                    <Tooltip
                        className={`details__header-color fa fa-bookmark-o ${
                            color ? `${color}-color` : ''
                        }`}
                        title={locale.detSetIconColor}
                        placement="left"
                        tagName="i"
                    >
                        <span className="details__colors-popup">
                            {Colors.AllColors.map(col => (
                                <span
                                    className={`details__colors-popup-item ${col}-color fa ${
                                        col === color ? 'fa-bookmark' : 'fa-bookmark-o'
                                    }`}
                                    key={col}
                                    data-color={col}
                                />
                            ))}
                        </span>
                    </Tooltip>
                    <h1 className="details__header-title">{title || locale.noTitle}</h1>
                    {customIcon ? (
                        <Tooltip
                            className="details__header-icon details__header-icon--icon"
                            style={{ backgroundImage: `url(${customIcon})` }}
                            title={locale.detSetIcon}
                        />
                    ) : (
                        <Tooltip
                            className={`details__header-icon fa fa-${icon}`}
                            title={locale.detSetIcon}
                        />
                    )}
                </div>
                <div className="details__body">
                    <Scrollable>
                        <DetailsFields locale={locale} entry={entry} />
                        <DetailsAside locale={locale} entry={entry} group={group} file={file} />
                        <div className="details__body-after" />
                    </Scrollable>
                    <div className="scroller__bar-wrapper">
                        <div className="scroller__bar" />
                    </div>
                </div>
                <div className="details__buttons">
                    {deleted ? (
                        <Tooltip
                            className="details__buttons-trash-del fa fa-minus-circle"
                            title={locale.detDelEntryPerm}
                            placement="top"
                            tagName="i"
                        />
                    ) : (
                        <Tooltip
                            className="details__buttons-trash fa fa-trash-o"
                            title={locale.detDelEntry}
                            placement="top"
                        />
                    )}
                    <div className="details__attachments">
                        <input
                            type="file"
                            className="details__attachment-input-file hide-by-pos"
                            multiple
                        />
                        {!!attachments && attachments.length > 0 && (
                            <div className="details__attachment-add">
                                <i className="fa fa-paperclip" />
                            </div>
                        )}
                        {!!attachments &&
                            attachments.map((attachment, ix) => (
                                <div className="details__attachment" data-id={ix} key={ix}>
                                    <i className={`fa fa-${attachment.icon}`} /> {attachment.title}
                                </div>
                            ))}
                        <div className="details__attachment-add">
                            <span className="details__attachment-add-title">
                                <Res id="detDropAttachments" />
                            </span>{' '}
                            <i className="fa fa-paperclip" />
                        </div>
                    </div>
                </div>
                <div className="details__dropzone">
                    <i className="fa fa-paperclip muted-color details__dropzone-icon" />
                    <h1 className="muted-color details__dropzone-header">
                        <Res id="detDropAttachments" />
                    </h1>
                </div>
            </div>
        );
    }
    renderEmpty() {
        return (
            <div className="empty-block muted-color">
                <h1 className="empty-block__title">
                    <Res id="detEmpty" />
                </h1>
            </div>
        );
    }
}

export { Details };
