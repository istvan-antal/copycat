export const ADD_SYNC_FOLDER = 'ADD_SYNC_FOLDER';
export const REMOVE_SYNC_FOLDER = 'REMOVE_SYNC_FOLDER';

export function addSyncFolder(localPath, remotePath) {
    return { type: ADD_SYNC_FOLDER, localPath, remotePath };
}

export function removeSyncFolder(index) {
    return { type: REMOVE_SYNC_FOLDER, index };
}