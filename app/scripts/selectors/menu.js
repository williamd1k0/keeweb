import { createSelector } from 'reselect';
import { getActiveFiles, getAllTags } from 'selectors/files';

const getSections = state => state.menu.sections;
const getItems = state => state.menu.items;
const getSectionIdsFromProps = (state, props) => props.menu.sections;
const getItemIdsFromProps = (state, props) => props.section.items;

export const ItemSelectors = {
    self: createSelector(
        [getItemIdsFromProps, getItems],
        (ids, items) => ids.map(id => items[id])
    ),
    tags: createSelector(
        [getAllTags],
        tags => {
            if (!tags.length) {
                return [
                    {
                        id: 'noTags',
                        title: 'tags',
                        titleIsLoc: true,
                        capitalize: true,
                        icon: 'tags',
                        alert: {
                            header: 'menuAlertNoTags',
                            body: 'menuAlertNoTagsBody',
                            icon: 'tags',
                        },
                    },
                ];
            }
            return tags.map(tag => ({
                id: `tag#${tag}`,
                title: tag,
                icon: 'tag',
                filterKey: 'tag',
                filterValue: tag,
            }));
        }
    ),
    groups: createSelector(
        [getActiveFiles],
        activeFiles => {
            const groups = [];
            for (const file of activeFiles) {
                addFileGroups(groups, file, file.topGroups);
            }
            return groups;
        }
    ),
    files: createSelector(
        [getActiveFiles],
        activeFiles =>
            activeFiles.map(file => ({
                id: file.id,
                title: file.name,
                icon: 'lock',
                settingsPage: 'file',
                fileId: file.id,
            }))
    ),
};

export const getMenuSections = createSelector(
    [getSectionIdsFromProps, getSections],
    (ids, sections) => ids.map(id => sections[id])
);

function addFileGroups(result, file, groupIds) {
    for (const groupUuid of groupIds) {
        const group = file.groups[groupUuid];
        if (group && !group.isRecycleBin) {
            result.push(group);
            addFileGroups(result, file, group.groups);
        }
    }
}
