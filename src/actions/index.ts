import { FolderAction, addFolder, browseForFolder } from './folders';
import { FolderFormAction, setFolderPath } from './folderForm';

export type AppAction = FolderAction | FolderFormAction;

export const actions = {
    addFolder,
    browseForFolder,
    setFolderPath,
};