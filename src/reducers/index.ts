import { folders, FolderList } from "./folders";
import { folderForm, FolderForm } from "./folderForm";

export interface AppState {
    folders: FolderList,
    folderForm: FolderForm,
}

export const reducers = {
    folders,
    folderForm,
};