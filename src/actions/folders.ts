export enum FolderActionType {
    AddFolder = 'addFolder',
    DeleteFolder = 'deleteFolder',
    BrowseForFolder = 'browseForFolder',
    UpdateFolderStatus = 'updateFolderStatus',
}

export enum FolderStatus {
    Idle = 'idle',
    Sycing = 'syncing',
}

export interface AddFolderAction {
    type: FolderActionType.AddFolder;
    path: string;
    remote: string;
}

export interface DeleteFolderAction {
    type: FolderActionType.DeleteFolder;
    path: string;
}

export interface BrowseForFolderAction {
    type: FolderActionType.BrowseForFolder;
}

export interface UpdateFolderStatusAction {
    type: FolderActionType.UpdateFolderStatus;
    path: string;
    status: FolderStatus;
}

export type FolderAction = AddFolderAction | DeleteFolderAction | BrowseForFolderAction | UpdateFolderStatusAction;

export const addFolder = (path: string, remote: string): AddFolderAction => ({
    type: FolderActionType.AddFolder,
    path,
    remote,
});

export const deleteFolder = (path: string): DeleteFolderAction => ({
    type: FolderActionType.DeleteFolder,
    path,
});

export const browseForFolder = (): BrowseForFolderAction => ({
    type: FolderActionType.BrowseForFolder,
});

export const updateFolderStatus = (path: string, status: FolderStatus): UpdateFolderStatusAction => ({
    type: FolderActionType.UpdateFolderStatus,
    path,
    status,
});