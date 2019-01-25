import kdbxweb from 'kdbxweb';
import { IconMap } from 'const/icon-map';
import { toDataUrl } from 'util/text/icon-url';

const KdbxIcons = kdbxweb.Consts.Icons;

class Group {
    constructor(kdbxGroup, db, parent, nestingLevel) {
        this.kdbxGroup = kdbxGroup;
        this.db = db;
        this.parent = parent;
        this.nestingLevel = nestingLevel;
        this.uuid = kdbxGroup.uuid.id;
        this.id = db.subId(this.uuid);
    }

    get title() {
        return this.parent ? this.kdbxGroup.name : this.db.name;
    }

    get titleIsText() {
        return true;
    }

    get expanded() {
        return this.kdbxGroup.expanded !== false;
    }

    get isRecycleBin() {
        return this.kdbxGroup.uuid.equals(this.db.kdbxFile.meta.recycleBinUuid);
    }

    get enableSearching() {
        return this.kdbxGroup.enableSearching;
    }

    get enableAutoType() {
        return this.kdbxGroup.enableAutoType;
    }

    get autoTypeSeq() {
        return this.kdbxGroup.defaultAutoTypeSeq;
    }

    get iconId() {
        return this.kdbxGroup.icon;
    }

    get icon() {
        const id = this.iconId;
        if ([KdbxIcons.Folder, KdbxIcons.FolderOpen].includes(id)) {
            return undefined;
        }
        return IconMap[id];
    }

    get customIconId() {
        return this.kdbxGroup.customIcon ? this.kdbxGroup.customIcon.toString() : null;
    }

    get customIcon() {
        if (this._customIcon === undefined) {
            const customIconId = this.customIconId;
            this._customIcon = customIconId
                ? toDataUrl(this.db.kdbxFile.meta.customIcons[customIconId])
                : null;
        }
        return this._customIcon;
    }

    get drag() {
        return !!this.parent;
    }

    get collapsible() {
        return !!this.parent;
    }
}

export { Group };
