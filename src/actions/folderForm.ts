export enum FolderFormActionType {
    SetFolderPath = 'setFolderPath',
}

export interface SetFolderPathAction {
    type: FolderFormActionType.SetFolderPath;
    path: string;
}

export type FolderFormAction = SetFolderPathAction;

export const setFolderPath = (path: string): SetFolderPathAction => ({
    type: FolderFormActionType.SetFolderPath,
    path,
});