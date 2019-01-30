import React from 'react';
import PropTypes from 'prop-types';
import { DetailsField } from 'components/det/DetailsField';
import { dtStr } from 'util/text/format';

const DetailsFields = ({ locale, entry }) => (
    <div className="details__body-fields">
        <DetailsField
            field="$UserName"
            locale={locale}
            title="user"
            titleRes={true}
            titleCapitalize={true}
            editable={true}
            value={entry.user}
        />
        <DetailsField
            field="$Password"
            locale={locale}
            title="password"
            titleRes={true}
            titleCapitalize={true}
            editable={true}
            value={entry.allFields.Password}
        />
        <DetailsField
            field="$URL"
            locale={locale}
            title="website"
            titleRes={true}
            titleCapitalize={true}
            editable={true}
            value={entry.displayUrl}
        />
        <DetailsField
            field="$Notes"
            locale={locale}
            title="notes"
            titleRes={true}
            titleCapitalize={true}
            multiLine={true}
            editable={true}
            value={entry.notes}
        />
        <DetailsField
            field="Tags"
            locale={locale}
            title="tags"
            titleRes={true}
            titleCapitalize={true}
            editable={true}
            value={entry.tags.join(', ')}
        />
        <DetailsField
            field="Expires"
            locale={locale}
            title="detExpires"
            titleRes={true}
            editable={true}
            value={dtStr(entry.expires, locale)}
        />
    </div>
);

DetailsFields.propTypes = {
    locale: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired,
};

export { DetailsFields };
