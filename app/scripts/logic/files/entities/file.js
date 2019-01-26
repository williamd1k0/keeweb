import kdbxweb from 'kdbxweb';

export function fileToModel(kdbx, oldFile) {
    return {
        id: oldFile.id,
        name: oldFile.name,
        uuid: kdbx.getDefaultGroup().uuid.id,

        groups: {},
        entries: {},
        customIcons: {},
        tags: [],
        tagMap: {},

        topGroups: kdbx.groups.map(gr => gr.uuid.id),

        defaultUser: kdbx.meta.defaultUser,
        recycleBinEnabled: kdbx.meta.recycleBinEnabled,
        historyMaxItems: kdbx.meta.historyMaxItems,
        historyMaxSize: kdbx.meta.historyMaxSize,
        keyEncryptionRounds: kdbx.header.keyEncryptionRounds,
        keyChangeForce: kdbx.meta.keyChangeForce,
        kdfParameters: readKdfParams(kdbx),
    };
}

function readKdfParams(kdbx) {
    const kdfParameters = kdbx.header.kdfParameters;
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
