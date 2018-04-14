import { folders, FolderList } from "./folders";

export interface AppState {
    folders: FolderList,
}

export const reducers = {
    folders,
};