export enum FolderActionType {
    AddFolder = 'addFolder',
    DeleteFolder = 'deleteFolder',
    BrowseForFolder = 'browseForFolder',
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


export type FolderAction = AddFolderAction | DeleteFolderAction | BrowseForFolderAction;

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