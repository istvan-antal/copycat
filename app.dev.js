import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './components/App';
import configureStore from './store/configureStore';
import * as backend from './store/backend.dev';

const store = configureStore(backend);

render(
    <Provider store={store}>
        <App {...store.getState()}/>
    </Provider>
    ,
    document.getElementById('app')
);