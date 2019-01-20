import { Colors } from 'const/colors';

const state = {
    list: {
        id: 'list',
        sections: ['all', 'colors', 'tags', 'groups', 'trash'],
        active: 'all',
    },
    settings: {
        id: 'settings',
        sections: ['general', 'shortcuts', 'plugins', 'about', 'help', 'files'],
        active: 'general',
    },
    sections: {
        all: {
            items: ['all'],
        },
        colors: {
            items: ['colors'],
        },
        tags: {
            itemSelector: 'tags',
            drag: true,
            scrollable: true,
        },
        groups: {
            itemSelector: 'groups',
            grow: true,
            scrollable: true,
        },
        trash: {
            items: ['trash'],
        },
        general: {
            items: ['general'],
        },
        shortcuts: {
            items: ['shortcuts'],
        },
        plugins: {
            items: ['plugins'],
        },
        about: {
            items: ['about'],
        },
        help: {
            items: ['help'],
        },
        files: {
            itemSelector: 'files',
            grow: true,
            scrollable: true,
        },
    },
    items: {
        all: {
            id: 'all',
            title: 'menuAllItems',
            icon: 'th-large',
            filterKey: '*',
        },
        colors: {
            id: 'colors',
            title: 'menuColors',
            icon: 'bookmark',
            cls: 'menu__item-colors',
            filterKey: 'color',
            filterValue: true,
            options: Colors.AllColors.map(color => ({
                cls: 'fa ' + color + '-color',
                value: color,
                filterValue: color,
            })),
        },
        trash: {
            id: 'trash',
            title: 'menuTrash',
            icon: 'trash',
            filterKey: 'trash',
            filterValue: true,
            button: {
                title: 'menuEmptyTrash',
                cls: 'fa-minus-circle menu__item-empty-trash',
            },
        },
        general: {
            id: 'general',
            title: 'menuSetGeneral',
            icon: 'cog',
            settingsView: 'general',
        },
        shortcuts: {
            id: 'shortcuts',
            title: 'shortcuts',
            icon: 'keyboard-o',
            settingsPage: 'shortcuts',
        },
        plugins: {
            id: 'plugins',
            title: 'plugins',
            icon: 'puzzle-piece',
            settingsPage: 'plugins',
        },
        about: {
            id: 'about',
            title: 'menuSetAbout',
            icon: 'info',
            settingsPage: 'about',
        },
        help: {
            id: 'help',
            title: 'help',
            icon: 'question',
            settingsPage: 'help',
        },
    },
};

export default function reducer() {
    return state;
}
