import kdbxweb from 'kdbxweb';
import { Group } from 'api/group';
import { Entry } from 'api/entry';

class Db {
    groups = {};
    entries = {};

    constructor(kdbxFile, id, name) {
        this.kdbxFile = kdbxFile;
        this.id = id;
        this.name = name;
        this.uuid = kdbxFile.getDefaultGroup().uuid.toString();
        this.readModel();
    }

    subId(id) {
        return `${this.id}.${id}`;
    }

    readModel() {
        const kdbxFile = this.kdbxFile;

        this.tagMap = {};
        this.tags = [];
        this.allGroups = [];
        for (const kdbxGroup of kdbxFile.groups) {
            this.readGroup(kdbxGroup, null, 0);
        }
        this.finalizeRead();
    }

    readGroup(kdbxGroup, parentGroup, nestingLevel) {
        const group = new Group(kdbxGroup, this, parentGroup, nestingLevel);
        if (!group.isRecycleBin) {
            this.allGroups.push(group);
        }
        for (const kdbxEntry of kdbxGroup.entries) {
            this.readEntry(kdbxEntry, group);
        }
        for (const childGroup of kdbxGroup.groups) {
            this.readGroup(childGroup, group, nestingLevel + 1);
        }
    }

    readEntry(kdbxEntry, group) {
        const entry = new Entry(kdbxEntry, this, group);
        for (const tag of entry.tags) {
            const tagLower = tag.toLowerCase();
            if (this.tagMap[tagLower]) {
                this.tagMap[tagLower] = tag;
            }
        }
    }

    finalizeRead() {
        this.tags = Object.values(this.tagMap);
    }

    get defaultUser() {
        return this.kdbxFile.meta.defaultUser;
    }

    get recycleBinEnabled() {
        return this.kdbxFile.meta.recycleBinEnabled;
    }

    get historyMaxItems() {
        return this.kdbxFile.meta.historyMaxItems;
    }

    get historyMaxSize() {
        return this.kdbxFile.meta.historyMaxSize;
    }

    get keyEncryptionRounds() {
        return this.kdbxFile.header.keyEncryptionRounds;
    }

    get keyChangeForce() {
        return this.kdbxFile.meta.keyChangeForce;
    }

    get kdfParameters() {
        const kdfParameters = this.kdbxFile.header.kdfParameters;
        if (!kdfParameters) {
            return undefined;
        }
        let uuid = kdfParameters.get('$UUID');
        if (!uuid) {
            return undefined;
        }
        uuid = kdbxweb.ByteUtils.bytesToBase64(uuid);
        if (uuid !== kdbxweb.Consts.KdfId.Argon2) {
            return undefined;
        }
        return {
            parallelism: kdfParameters.get('P').valueOf(),
            iterations: kdfParameters.get('I').valueOf(),
            memory: kdfParameters.get('M').valueOf(),
        };
    }
}

export { Db };
