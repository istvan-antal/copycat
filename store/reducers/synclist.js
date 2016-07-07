import { ADD_SYNC_FOLDER, REMOVE_SYNC_FOLDER } from '../actions/synclist';

export const synclist = (state = [], action) => {
    switch (action.type) {
    case ADD_SYNC_FOLDER:
        return [...state, { localPath: action.localPath, remotePath: action.remotePath }];
    case REMOVE_SYNC_FOLDER:
        return [...state.slice(0, action.index), ...state.slice(action.index + 1)];
    default:
        return state;
    }
};