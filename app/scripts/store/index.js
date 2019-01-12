import { createStore, combineReducers } from 'redux';
import buildReducer from '../util/build-reducer';
import env from './env';
import settings from './settings';
import files from './files';

const reducers = {
    env,
    settings,
    files,
};

for (const key of Object.keys(reducers)) {
    reducers[key] = buildReducer(key, reducers[key]);
}

const rootReducer = combineReducers(reducers);

const store = createStore(rootReducer);

export default store;
