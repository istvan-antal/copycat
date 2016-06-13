import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { remote } from 'electron';
const { writeFile, readFileSync, existsSync } = remote.require('fs');
import { synclist } from './reducers/synclist';
import { currentView } from './reducers/currentView';
import { progress } from './reducers/progress';
import { sync } from './reducers/sync';

const app = remote.app;
const userDataPath = app.getPath('userData');
const uiStateFile = userDataPath + '/state.json';

const persistence = store => next => action => {
    const state = next(action);
    writeFile(uiStateFile, JSON.stringify(store.getState()));
    return state;
};

export default function configureStore() {
    const logger = createLogger();

    let initialSate = {};

    if (existsSync(uiStateFile)) {
        initialSate = JSON.parse(readFileSync(uiStateFile));
    }

    return createStore(combineReducers({
        currentView,
        synclist,
        progress,
        sync
    }), initialSate, applyMiddleware(logger, persistence));
}