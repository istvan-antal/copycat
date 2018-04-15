import { FolderAction, addFolder, browseForFolder, deleteFolder } from './folders';
import { FolderFormAction, setFolderPath } from './folderForm';

export type AppAction = FolderAction | FolderFormAction;

export const actions = {
    addFolder,
    deleteFolder,
    browseForFolder,
    setFolderPath,
};