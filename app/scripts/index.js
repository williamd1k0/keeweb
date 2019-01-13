import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'containers/App';
import startup from 'logic/app/startup';
import store from 'store';

document.addEventListener('DOMContentLoaded', () => {
    store.dispatch(startup());

    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.body
    );
});
