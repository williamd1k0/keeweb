export function buildReducer(name, modules) {
    const reducers = {};
    for (const [moduleName, module] of Object.entries(modules)) {
        let reducerName = module.type;
        if (!module.type) {
            if (moduleName === 'init') {
                reducerName = 'init';
            } else {
                throw new Error(`Type not defined for ${name}/${moduleName}`);
            }
        }
        if (!module.default) {
            throw new Error(`Reducer not defined for ${name}/${moduleName}`);
        }
        reducers[reducerName] = module.default;
    }
    return function reducer(state, action) {
        if (state === undefined) {
            return reducers.init();
        }
        const reducer = reducers[action.type];
        if (!reducer) {
            return state;
        }
        return reducer(state, action);
    };
}
