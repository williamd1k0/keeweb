import React from 'react';
import PropTypes from 'prop-types';
import { Res } from 'containers/util/Res';

class DetailsField extends React.Component {
    static propTypes = {
        locale: PropTypes.object.isRequired,
        field: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        titleRes: PropTypes.bool,
        titleCapitalize: PropTypes.bool,
        value: PropTypes.any,
        editable: PropTypes.bool,
        multiLine: PropTypes.bool,
        canEditTitle: PropTypes.bool,
        protect: PropTypes.bool,
    };
    render() {
        const {
            title,
            titleRes,
            titleCapitalize,
            editable,
            multiLine,
            canEditTitle,
            protect,
            value,
        } = this.props;
        return (
            <div
                className={`details__field ${editable ? 'details__field--editable' : ''} ${
                    multiLine ? 'details__field--multiline' : ''
                } ${canEditTitle ? 'details__field--can-edit-title' : ''} ${
                    protect ? 'details__field--protect' : ''
                }`}
            >
                <div className="details__field-label" draggable="true">
                    {titleRes ? <Res id={title} capitalize={titleCapitalize} /> : title}
                </div>
                <div className="details__field-value">{this.renderValue(value)}</div>
            </div>
        );
    }
    renderValue(value) {
        if (!value) {
            return null;
        }
        if (value.isProtected) {
            return '•'.repeat(value.textLength);
        }
        return value;
    }
}

export { DetailsField };
