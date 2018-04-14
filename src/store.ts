import { createStore, applyMiddleware, MiddlewareAPI, Dispatch, Middleware, AnyAction, Action, combineReducers } from 'redux';
import { AppAction } from './actions';
import { reducers, AppState } from './reducers';
import { FolderActionType } from './actions/folders';
// import { app, AppState } from './reducers/app';
const { remote, ipcRenderer } = require('electron');

export const backendMiddleware: Middleware = <AppState>(store: MiddlewareAPI<AppState>) => (next: Dispatch<AppState>) => (originalAction: any) => {
    // ipcRenderer.send('clientLog', JSON.stringify(store.getState()));
    const result = next(originalAction);
    const action: AppAction = originalAction as any;

    switch (action.type) {
        case FolderActionType.AddFolder:
            ipcRenderer.send('saveStore', [store.getState()]);
        break;
    }
    // ipcRenderer.send('clientLog', JSON.stringify(action));
    /*switch (action.type) {
        case AppActionType.BrowseForDestination:
        case AppActionType.SetDestination:
        case AppActionType.UpdateDownloadProgress:
        case AppActionType.Download:
        case AppActionType.UpdateDownloadState:
            ipcRenderer.send('clientAction', [store.getState(), action]);
    }*/

    return result
}

export const create = (initialState: AppState) => {
    const store = createStore(combineReducers(reducers as any) as any, initialState, applyMiddleware(backendMiddleware));
    return store;
};