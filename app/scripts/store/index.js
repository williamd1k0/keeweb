import { createStore, combineReducers } from 'redux';
import buildReducer from '../util/build-reducer';
import env from './env';
import locale from './locale';
import files from './files';
import runtime from './runtime';
import settings from './settings';

const reducers = {
    env,
    files,
    locale,
    runtime,
    settings,
};

for (const key of Object.keys(reducers)) {
    reducers[key] = buildReducer(key, reducers[key]);
}

const rootReducer = combineReducers(reducers);

const devToolsEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devToolsEnhancer);

export default store;
