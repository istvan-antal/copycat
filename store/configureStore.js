import { createStore, combineReducers, applyMiddleware } from 'redux';
// import createLogger from 'redux-logger';
import { remote } from 'electron';
const { writeFileSync, readFileSync, existsSync } = require('fs');
import { synclist } from './reducers/synclist';
import { currentView } from './reducers/currentView';
import { progress } from './reducers/progress';
import { sync } from './reducers/sync';
import { START_SYNC } from './actions/sync';
import { syncRemoteToLocal, syncLocalToRemote } from '../sync';
import { updateProgress } from './actions/progress';
import { switchCurrentView } from './actions/currentView';

const app = remote.app;
const userDataPath = app.getPath('userData');
const uiStateFile = userDataPath + '/state.json';

const persistence = ({ getState }) => next => action => {
    const state = next(action);
    writeFileSync(uiStateFile, JSON.stringify(getState()));
    return state;
};

const syncing = ({ getState, dispatch }) => next => action => {
    const state = next(action);

    if (action.type === START_SYNC) {
        const synclistItems = getState().synclist;
        let currentIndex = 0;
        const performSync = action.syncType === 'pull' ? syncRemoteToLocal : syncLocalToRemote;
        const doNextSync = () => {
            if (currentIndex >= synclistItems.length) {
                dispatch(switchCurrentView('HomeScreen'));
                return;
            }

            const currentSyncItem = synclistItems[currentIndex];
            performSync(currentSyncItem.localPath, currentSyncItem.remotePath).
                onProgress((progressObject) => {
                    dispatch(updateProgress(progressObject));
                }).then(() => {
                    doNextSync();
                }, () => {
                    // console.error('FAIL');
                    dispatch(switchCurrentView('HomeScreen'));
                });
            currentIndex += 1;
        };
        doNextSync();
    }

    return state;
};

export default function configureStore() {
    // const logger = createLogger();

    let initialSate = {};

    if (existsSync(uiStateFile)) {
        initialSate = JSON.parse(readFileSync(uiStateFile));
    }

    return createStore(combineReducers({
        currentView,
        synclist,
        progress,
        sync
    }), initialSate, applyMiddleware(/* logger, */syncing, persistence));
}