const state = {
    active: '',
    advancedEnabled: false,
    advanced: {
        user: true,
        other: true,
        url: true,
        protect: false,
        notes: true,
        pass: false,
        cs: false,
        regex: false,
        history: false,
        title: true,
    },
};

export default function reducer() {
    return state;
}
