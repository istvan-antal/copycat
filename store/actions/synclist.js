export const ADD_SYNC_FOLDER = 'ADD_SYNC_FOLDER';

export function addSyncFolder(localPath, remotePath) {
    return { type: ADD_SYNC_FOLDER, localPath, remotePath };
}