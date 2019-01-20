import { createSelector } from 'reselect';
import { getActiveFiles } from 'selectors/files';

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
        [],
        () => [
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
        ]
    ),
    groups: createSelector(
        [getActiveFiles],
        activeFiles => {
            return activeFiles.map(file => {
                const defaultGroup = file.groups[file.uuid];
                return {
                    id: defaultGroup.id,
                    title: file.name,
                    titleIsText: true,
                    group: defaultGroup,
                    file: file,
                };
            });
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
