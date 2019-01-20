const state = {
    list: {
        sections: ['all', 'colors', 'tags', 'groups', 'trash'],
        active: 'all',
    },
    settings: {
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
            title: 'menuAllItems',
            icon: 'th-large',
            filterKey: '*',
        },
        colors: {
            title: 'menuColors',
            icon: 'bookmark',
            cls: 'menu__item-colors',
            filterKey: 'color',
            filterValue: true,
        },
        noTags: {
            title: 'tags',
            capitalize: true,
            icon: 'tags',
            alert: {
                header: 'menuAlertNoTags',
                body: 'menuAlertNoTagsBody',
                icon: 'tags',
            },
        },
        trash: {
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
            title: 'menuSetGeneral',
            icon: 'cog',
            settingsView: 'general',
        },
        shortcuts: {
            title: 'shortcuts',
            icon: 'keyboard-o',
            settingsPage: 'shortcuts',
        },
        plugins: {
            title: 'plugins',
            icon: 'puzzle-piece',
            settingsPage: 'plugins',
        },
        about: {
            title: 'menuSetAbout',
            icon: 'info',
            settingsPage: 'about',
        },
        help: {
            title: 'help',
            icon: 'question',
            settingsPage: 'help',
        },
    },
};

export default function reducer() {
    return state;
}
