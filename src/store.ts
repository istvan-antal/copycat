import { createStore, applyMiddleware, MiddlewareAPI, Dispatch, Middleware, AnyAction, Action, combineReducers } from 'redux';
import { AppAction } from './actions';
import { reducers, AppState } from './reducers';
import { FolderActionType } from './actions/folders';
// import { app, AppState } from './reducers/app';
const { remote, ipcRenderer } = require('electron');

export const backendMiddleware: Middleware = <AppState>(store: MiddlewareAPI<AppState>) => (next: Dispatch<AppState>) => (originalAction: any) => {
    const result = next(originalAction);
    const action: AppAction = originalAction as any;

    ipcRenderer.send('action', [store.getState(), action]);

    return result
}

export const create = (initialState: AppState) => {
    const store = createStore(combineReducers(reducers as any) as any, initialState, applyMiddleware(backendMiddleware));

    ipcRenderer.on('action', (e: any, action: AppAction) => {
        store.dispatch(action);
    });
    
    return store;
};