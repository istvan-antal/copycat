export enum FolderFormActionType {
    SetFolderPath = 'setFolderPath',
    SetRemotePath = 'setRemotePath',
}

export interface SetFolderPathAction {
    type: FolderFormActionType.SetFolderPath;
    path: string;
}

export interface SetRemotePathAction {
    type: FolderFormActionType.SetRemotePath;
    remote: string;
}

export type FolderFormAction = SetFolderPathAction | SetRemotePathAction;

export const setFolderPath = (path: string): SetFolderPathAction => ({
    type: FolderFormActionType.SetFolderPath,
    path,
});

export const setRemotePath = (remote: string): SetRemotePathAction => ({
    type: FolderFormActionType.SetRemotePath,
    remote,
});