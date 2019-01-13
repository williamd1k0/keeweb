import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import buildReducer from 'util/redux/build-reducer';
import env from 'store/env';
import locale from 'store/locale';
import files from 'store/files';
import settings from 'store/settings';
import ui from 'store/ui';
import uiOpen from 'store/ui-open';

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
