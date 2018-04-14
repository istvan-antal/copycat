import * as React from 'react';
import { render } from 'react-dom';
import { Dispatch, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import { AppState } from './reducers';
import store from './store';
import App from './App';
import { actions } from './actions';

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

if ((module as any).hot) {
    (module as any).hot.accept();
}