export enum FolderActionType {
    AddFolder = 'addFolder',
}

export interface AddFolderAction {
    type: FolderActionType.AddFolder;
    path: string;
}

export type FolderAction = AddFolderAction;

export const addFolder = (path: string): AddFolderAction => ({
    type: FolderActionType.AddFolder,
    path,
});