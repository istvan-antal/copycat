export enum FolderActionType {
    AddFolder = 'addFolder',
    BrowseForFolder = 'browseForFolder',
}

export interface AddFolderAction {
    type: FolderActionType.AddFolder;
    path: string;
}

export interface BrowseForFolderAction {
    type: FolderActionType.BrowseForFolder;
}


export type FolderAction = AddFolderAction | BrowseForFolderAction;

export const addFolder = (path: string): AddFolderAction => ({
    type: FolderActionType.AddFolder,
    path,
});

export const browseForFolder = (): BrowseForFolderAction => ({
    type: FolderActionType.BrowseForFolder,
});