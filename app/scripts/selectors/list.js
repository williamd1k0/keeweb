import { createSelector } from 'reselect';
import { getActiveFiles } from 'selectors/files';

export const getListItems = createSelector(
    [getActiveFiles],
    allFiles => {
        const items = [];
        for (const file of allFiles) {
            for (const entry of Object.values(file.entries)) {
                items.push({
                    entry,
                    id: entry.id,
                    description: 'TODO',
                });
            }
        }
        items.sort((x, y) => x.entry.title.localeCompare(y.entry.title));
        return items;
    }
);
