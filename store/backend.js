import { remote } from 'electron';
const { writeFileSync, readFileSync, existsSync } = require('fs');
const app = remote.app;
const userDataPath = app.getPath('userData');
const uiStateFile = userDataPath + '/state.json';

import { START_SYNC } from './actions/sync';
import { syncRemoteToLocal, syncLocalToRemote } from '../sync';
import { updateProgress } from './actions/progress';
import { switchCurrentView } from './actions/currentView';


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

export const getInitialState = () => {
    if (existsSync(uiStateFile)) {
        return JSON.parse(readFileSync(uiStateFile));
    }

    return {};
};

export const middlewares = [syncing, persistence];