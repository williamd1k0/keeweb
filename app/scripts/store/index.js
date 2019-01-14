import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import buildReducer from 'util/redux/build-reducer';
import camelCase from 'lodash/camelCase';

const reducers = {};

const reducerFiles = require.context('store/', true).keys();

const modulePartsRegex = /^\.\/([\w\-]+)\/(.*)\.js$/;
for (const reducerFile of reducerFiles) {
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
    const modulePath = `${folder}/${path}`;
    reducerGroup[path] = require(`store/${modulePath}`);
}

for (const key of Object.keys(reducers)) {
    reducers[key] = buildReducer(key, reducers[key]);
}

const rootReducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
