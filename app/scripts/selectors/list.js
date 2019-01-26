import { createSelector } from 'reselect';
import { getActiveFiles } from 'selectors/files';
import { stringComparator, dateComparator } from 'util/text/comparators';

const getSearch = state => state.list.search;
const getAdvancedSearch = state => (state.list.advancedEnabled ? state.list.advanced : null);
const getSort = state => state.list.sort;

const comparators = {
    title: stringComparator('title', true),
    '-title': stringComparator('title', false),
    website: stringComparator('url', true),
    '-website': stringComparator('url', false),
    user: stringComparator('user', true),
    '-user': stringComparator('user', false),
    created: dateComparator('created', true),
    '-created': dateComparator('created', false),
    updated: dateComparator('updated', true),
    '-updated': dateComparator('updated', false),
    '-attachments': (x, y) => attachmentSortVal(x).localeCompare(attachmentSortVal(y)),
};

function attachmentSortVal(entry) {
    const att = entry.attachments;
    let str = att.length ? String.fromCharCode(64 + att.length) : 'Z';
    if (att[0]) {
        str += att[0].title;
    }
    return str;
}

export const getListItems = createSelector(
    [getActiveFiles, getSearch, getAdvancedSearch, getSort],
    (allFiles, search, advancedSearch, sort) => {
        let entries = [];
        for (const file of allFiles) {
            entries = entries.concat(Object.values(file.entries));
        }
        const comparator = comparators[sort];
        if (comparator) {
            entries.sort(comparator);
        }
        entries = entries.filter(entry => entry.title.toLowerCase().indexOf(search) >= 0);
        return entries.map(entry => ({
            entry,
            id: entry.id,
            description: 'TODO',
        }));
    }
);
