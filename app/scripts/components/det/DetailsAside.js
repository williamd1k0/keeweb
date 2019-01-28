import React from 'react';
import PropTypes from 'prop-types';
import { DetailsField } from 'components/det/DetailsField';

const DetailsAside = ({ locale, entry, group }) => (
    <div className="details__body-aside">
        <DetailsField
            field="$Group"
            locale={locale}
            title="group"
            titleRes={true}
            titleCapitalize={true}
            value={group.title}
        />
        <DetailsField
            field="Created"
            locale={locale}
            title="detCreated"
            titleRes={true}
            value={entry.created}
        />
        <DetailsField
            field="Updated"
            locale={locale}
            title="detUpdated"
            titleRes={true}
            value={entry.updated}
        />
        <DetailsField
            field="History"
            locale={locale}
            title="history"
            titleRes={true}
            titleCapitalize={true}
            value={
                entry.historyLength +
                ' ' +
                (entry.historyLength === 1 ? locale.detHistoryRec : locale.detHistoryRecs)
            }
        />
    </div>
);

DetailsAside.propTypes = {
    locale: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
};

export { DetailsAside };
