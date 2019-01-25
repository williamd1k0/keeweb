import { createSelector } from 'reselect';
import { getActiveFiles, getAllTags } from 'selectors/files';
import { KdbxRepository } from 'api/kdbx-repository';

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
                titleIsText: true,
                icon: 'tag',
                filterKey: 'tag',
                filterValue: tag,
            }));
        }
    ),
    groups: createSelector(
        [getActiveFiles],
        activeFiles => {
            let groups = [];
            for (const file of activeFiles) {
                const kdbx = KdbxRepository.get(file.uuid);
                groups = groups.concat(kdbx.allGroups);
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
                titleIsText: true,
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
