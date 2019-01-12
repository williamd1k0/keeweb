export default function buildReducer(name, modules) {
    const reducers = {};
    for (const [moduleName, module] of Object.entries(modules)) {
        if (moduleName !== 'init' && !module.action) {
            throw new Error(`Action nor defined for ${name}/${moduleName}`);
        }
        const reducerName = module.action || moduleName;
        reducers[reducerName] = module.reducer;
    }
    return function reducer(state, action) {
        if (!state) {
            return reducers.init();
        }
        const reducer = reducers[action.type];
        if (!reducer) {
            return state;
        }
        return reducer(state, action);
    };
}
