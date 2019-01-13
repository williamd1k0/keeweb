import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import buildReducer from '../util/build-reducer';
import env from './env';
import locale from './locale';
import files from './files';
import settings from './settings';
import ui from './ui';
import uiOpen from './ui-open';

const reducers = {
    env,
    files,
    locale,
    settings,
    ui,
    uiOpen,
};

for (const key of Object.keys(reducers)) {
    reducers[key] = buildReducer(key, reducers[key]);
}

const rootReducer = combineReducers(reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
