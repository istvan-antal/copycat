import { ADD_SYNC_FOLDER } from '../actions/synclist';

export const synclist = (state = [], action) => {
    switch (action.type) {
    case ADD_SYNC_FOLDER:
        return [...state, { localPath: action.localPath, remotePath: action.remotePath }];
    default:
        return state;
    }
};