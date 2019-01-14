import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import buildReducer from 'util/redux/build-reducer';
import camelCase from 'lodash/camelCase';

const reducers = {};

const reducerFiles = require.context('store/', true, /^\.\/[\w\-]+\/.*\.js$/).keys();

for (const reducerFile of reducerFiles) {
    const [, folder, path] = reducerFile.match(/^\.\/([\w\-]+)\/(.*)\.js$/);
    const reducerGroupName = camelCase(folder);
    let reducerGroup = reducers[reducerGroupName];
    if (!reducerGroup) {
        reducerGroup = {};
        reducers[reducerGroupName] = reducerGroup;
    }
    reducerGroup[path] = require(`store/${folder}/${path}`);
}

for (const key of Object.keys(reducers)) {
    reducers[key] = buildReducer(key, reducers[key]);
}

const rootReducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
