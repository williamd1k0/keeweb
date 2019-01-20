import { createSelector } from 'reselect';

const getSections = state => state.menu.sections;
const getItems = state => state.menu.items;

export const ItemSelectors = {
    tags: createSelector(
        [],
        () => ['noTags']
    ),
    groups: createSelector(
        [],
        () => []
    ),
    files: createSelector(
        [],
        () => []
    ),
};

const getSectionNameFromProps = (state, props) => props.section;

export const getSection = createSelector(
    [getSections, getSectionNameFromProps],
    (sections, sectionName) => sections[sectionName]
);

const getItemNameFromProps = (state, props) => props.item;

export const getItem = createSelector(
    [getItems, getItemNameFromProps],
    (items, itemName) => items[itemName]
);
