import * as React from 'react';
import { render } from 'react-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import { AppState } from './reducers';
import { create } from './store';
import App from './App';
import { actions } from './actions';
const { remote, ipcRenderer } = require('electron');

ipcRenderer.send('ready', []);

ipcRenderer.on('initialState', (e: any, state: AppState) => {
    const store = create(state);
    const mapStateToProps = (state: AppState) => state;

    const mapDispatchToProps = (dispatch: Dispatch<AppState>) => ({
        actions: bindActionCreators(actions, dispatch),
    });

    const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

    render((
        <Provider store={store}>
            <ConnectedApp />
        </Provider>
    ), document.getElementById('root')); 
});

if ((module as any).hot) {
    (module as any).hot.accept();
}