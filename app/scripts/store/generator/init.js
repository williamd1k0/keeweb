const state = {
    builtinPresets: {
        default: {
            id: 'default',
            builtin: true,
            title: 'genPresetDefault',
            length: 16,
            upper: true,
            lower: true,
            digits: true,
        },
        pronounceable: {
            id: 'pronounceable',
            builtin: true,
            title: 'genPresetPronounceable',
            length: 10,
            lower: true,
            upper: true,
        },
        med: {
            id: 'med',
            builtin: true,
            title: 'genPresetMed',
            length: 16,
            upper: true,
            lower: true,
            digits: true,
            special: true,
            brackets: true,
            ambiguous: true,
        },
        long: {
            id: 'long',
            builtin: true,
            title: 'genPresetLong',
            length: 32,
            upper: true,
            lower: true,
            digits: true,
        },
        pin4: {
            id: 'pin4',
            builtin: true,
            title: 'genPresetPin4',
            length: 4,
            digits: true,
        },
        mac: {
            id: 'mac',
            builtin: true,
            title: 'genPresetMac',
            length: 17,
            upper: true,
            digits: true,
            special: true,
        },
        hash128: {
            id: 'hash128',
            title: 'genPresetHash128',
            length: 32,
            lower: true,
            digits: true,
        },
        hash256: {
            id: 'hash256',
            builtin: true,
            title: 'genPresetHash256',
            length: 64,
            lower: true,
            digits: true,
        },
    },
};

export default function reducer() {
    return state;
}
