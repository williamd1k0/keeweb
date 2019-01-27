import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { buildReducer } from 'util/redux/build-reducer';
import { camelCase } from 'util/text/case';

const reducers = {};

const context = require.context('store/', true, /\.js$/);

const modulePartsRegex = /^\.\/([\w\-\/]+)\/([\w\-]+)\.js$/;
for (const reducerFile of context.keys()) {
    const match = reducerFile.match(modulePartsRegex);
    if (!match) {
        continue;
    }
    const [, folder, path] = match;
    const reducerGroupName = camelCase(folder);
    let reducerGroup = reducers[reducerGroupName];
    if (!reducerGroup) {
        reducerGroup = {};
        reducers[reducerGroupName] = reducerGroup;
    }
    const reducerModule = context(reducerFile);
    reducerGroup[path] = reducerModule;
    const expectedType = `${folder}/${path}`;
    if (reducerModule.type && reducerModule.type !== expectedType) {
        throw new Error(`Bad reducer type: expected ${expectedType}, found ${reducerModule.type}`);
    }
}

for (const key of Object.keys(reducers)) {
    reducers[key] = buildReducer(key, reducers[key]);
}

const rootReducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export { store };
