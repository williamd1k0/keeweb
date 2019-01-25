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

    readModel() {
        const kdbxFile = this.kdbxFile;

        this.defaultUser = kdbxFile.meta.defaultUser;
        this.recycleBinEnabled = kdbxFile.meta.recycleBinEnabled;
        this.historyMaxItems = kdbxFile.meta.historyMaxItems;
        this.historyMaxSize = kdbxFile.meta.historyMaxSize;
        this.keyEncryptionRounds = kdbxFile.header.keyEncryptionRounds;
        this.keyChangeForce = kdbxFile.meta.keyChangeForce;
        this.kdfParameters = this.readKdfParams();

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

    readKdfParams() {
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

    subId(id) {
        return `${this.id}.${id}`;
    }
}

export { Db };
