import React from 'react';
import PropTypes from 'prop-types';
import { DetailsField } from 'components/det/DetailsField';
import { dtStr } from 'util/text/format';
import { plural } from 'util/text/plural';

const DetailsAside = ({ locale, entry, group, file }) => (
    <div className="details__body-aside">
        <DetailsField
            field="$File"
            locale={locale}
            title="file"
            titleRes={true}
            titleCapitalize={true}
            value={file.name}
        />
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
            value={dtStr(entry.created, locale)}
        />
        <DetailsField
            field="Updated"
            locale={locale}
            title="detUpdated"
            titleRes={true}
            value={dtStr(entry.updated, locale)}
        />
        <DetailsField
            field="History"
            locale={locale}
            title="history"
            titleRes={true}
            titleCapitalize={true}
            value={plural(entry.historyLength, locale.detHistoryRec, locale.detHistoryRecs)}
        />
    </div>
);

DetailsAside.propTypes = {
    locale: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired,
    group: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
};

export { DetailsAside };
