import { createSelector } from 'reselect';
import { getActiveFiles } from 'selectors/files';
import { stringComparator, dateComparator } from 'util/text/comparators';
import { dtStr } from 'util/text/format';

const getSearch = state => state.list.search;
const getAdvancedSearch = state => (state.list.advancedEnabled ? state.list.advanced : null);
const getSort = state => state.list.sort;
const getFilterKey = state => state.menu.list.filterKey;
const getFilterValue = state => state.menu.list.filterValue;
const getExpandGroups = state => state.settings.expandGroups;
const getLocale = state => state.locale;
const getActiveItemFromState = state => state.list.active;

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

const entryDescriptors = {
    default: entry => entry.user || entry.notes || entry.displayUrl,
    website: (entry, locale) => entry.displayUrl || `(${locale.listNoWebsite})`,
    user: (entry, locale) => entry.user || `(${locale.listNoUser})`,
    created: (entry, locale) => dtStr(entry.created, locale),
    updated: (entry, locale) => dtStr(entry.updated, locale),
    attachments: (entry, locale) =>
        entry.attachments.map(a => a.title).join(', ') || `(${locale.listNoAttachments})`,
};

function attachmentSortVal(entry) {
    const att = entry.attachments;
    let str = att.length ? String.fromCharCode(64 + att.length) : 'Z';
    if (att[0]) {
        str += att[0].title;
    }
    return str;
}

const getFilter = createSelector(
    [getSearch, getAdvancedSearch, getFilterKey, getFilterValue, getExpandGroups],
    (search, advancedSearch, filterKey, filterValue, expandGroups) => {
        const filter = {};
        if (search) {
            filter.text = search;
            filter.textLower = search.toLowerCase();
        }
        if (expandGroups) {
            filter.subGroups = expandGroups;
        }
        if (advancedSearch) {
            filter.advanced = advancedSearch;
        }
        switch (filterKey) {
            case '*':
                break;
            case 'tag':
                filter.tag = filterValue;
                filter.tagLower = filterValue.toLowerCase();
                break;
            case 'color':
                filter.color = filterValue;
                break;
            case 'trash':
                filter.trash = true;
                break;
            case 'group': {
                const [file, group] = filterValue.split('.');
                filter.file = file;
                filter.group = group;
                break;
            }
            default:
                throw new Error(`Bad filter: ${filterKey}`);
        }
        return filter;
    }
);

function addFileEntriesByFilter(file, filter, entries) {
    if (filter.file && filter.file !== file.id) {
        return [];
    }
    let groups = file.topGroups;
    if (filter.trash) {
        if (!file.recycleBinUuid) {
            return [];
        }
        groups = [file.recycleBinUuid];
    } else if (filter.group) {
        groups = [filter.group];
    }
    for (const groupUuid of groups) {
        addGroupEntriesByFilter(groupUuid, file, filter, entries);
    }
}

function addGroupEntriesByFilter(groupUuid, file, filter, entries) {
    const group = file.groups[groupUuid];
    if (!groupMatchesFilter(group, filter)) {
        return;
    }
    for (const entryUuid of group.entries) {
        const entry = file.entries[entryUuid];
        if (entryMatchesFilter(entry, filter)) {
            entries.push(entry);
        }
    }
    if (filter.subGroups) {
        for (const subGroupUuid of group.groups) {
            addGroupEntriesByFilter(subGroupUuid, file, filter, entries);
        }
    }
}

function groupMatchesFilter(group, filter) {
    if (group.isRecycleBin && !filter.trash) {
        return false;
    }
    if (group.enableSearching === false && filter.group !== group.uuid.id) {
        return false;
    }
    if (group.isEntryTemplatesGroup && filter.group !== group.uuid.id) {
        return false;
    }
    return true;
}

function entryMatchesFilter(entry, filter) {
    if (filter.tagLower && entry.tagsLower.indexOf(filter.tagLower) < 0) {
        return false;
    }
    if (filter.color) {
        if (filter.color === true) {
            if (!entry.color) {
                return false;
            }
        } else if (entry.color !== filter.color) {
            return false;
        }
    }
    if (filter.text) {
        if (filter.advanced) {
            if (!entryMatchesAdvancedFilter(entry, filter)) {
                return false;
            }
        } else {
            if (entry.searchText.indexOf(filter.textLower) < 0) {
                return false;
            }
        }
    }
    return true;
}

function entryMatchesAdvancedFilter(entry, filter) {
    const adv = filter.advanced;
    let search, match;
    if (adv.regex) {
        try {
            search = new RegExp(filter.text, adv.cs ? '' : 'i');
        } catch (e) {
            return false;
        }
        match = matchRegex;
    } else if (adv.cs) {
        search = filter.text;
        match = matchString;
    } else {
        search = filter.textLower;
        match = matchStringLower;
    }
    if (matchEntry(entry, adv, match, search)) {
        return true;
    }
    // TODO: history
    // if (adv.history) {
    //     for (let i = 0, len = this.entry.history.length; i < len; i++) {
    //         if (this.matchEntry(this.entry.history[0], adv, match, search)) {
    //             return true;
    //         }
    //     }
    // }
    return false;
}

function matchString(str, find) {
    if (str.isProtected) {
        return str.includes(find);
    }
    return str.indexOf(find) >= 0;
}

function matchStringLower(str, findLower) {
    if (str.isProtected) {
        return str.includesLower(findLower);
    }
    return str.toLowerCase().indexOf(findLower) >= 0;
}

function matchRegex(str, regex) {
    if (str.isProtected) {
        str = str.getText();
    }
    return regex.test(str);
}

function matchEntry(entry, adv, compare, search) {
    if (adv.user && matchField(entry, 'UserName', compare, search)) {
        return true;
    }
    if (adv.url && matchField(entry, 'URL', compare, search)) {
        return true;
    }
    if (adv.notes && matchField(entry, 'Notes', compare, search)) {
        return true;
    }
    if (adv.pass && matchField(entry, 'Password', compare, search)) {
        return true;
    }
    if (adv.title && matchField(entry, 'Title', compare, search)) {
        return true;
    }
    let matches = false;
    if (adv.other || adv.protect) {
        const fieldNames = Object.keys(entry.fields);
        matches = fieldNames.some(field => {
            if (typeof entry.fields[field] === 'string') {
                return adv.other && matchField(entry, field, compare, search);
            } else {
                return adv.protect && matchField(entry, field, compare, search);
            }
        });
    }
    return matches;
}

function matchField(entry, field, compare, search) {
    const val = entry.allFields[field];
    return val ? compare(val, search) : false;
}

export const getListItems = createSelector(
    [getActiveFiles, getFilter, getSort, getLocale],
    (allFiles, filter, sort, locale) => {
        const entries = [];
        for (const file of allFiles) {
            addFileEntriesByFilter(file, filter, entries);
        }
        const comparator = comparators[sort];
        if (comparator) {
            entries.sort(comparator);
        }
        const descriptor = entryDescriptors[sort.replace('-', '')] || entryDescriptors.default;
        return entries.map(entry => ({
            entry,
            id: entry.id,
            description: descriptor(entry, locale),
        }));
    }
);

export const getActiveItemId = createSelector(
    [getListItems, getActiveItemFromState],
    (listItems, activeItem) => {
        if (!listItems.length) {
            return undefined;
        }
        if (listItems.some(item => item.id === activeItem)) {
            return activeItem;
        } else {
            return listItems[0].id;
        }
    }
);
