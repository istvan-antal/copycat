import { FolderAction, FolderActionType } from '../actions/folders';
import { AnyAction } from 'redux';

export interface Folder {
    path: string;
    remote: string;
}

export type FolderList = Folder[];

export const folders = (state: FolderList = [], action: FolderAction): FolderList => {
    switch (action.type) {
        case FolderActionType.AddFolder:
        return [...state, { path: action.path, remote: action.remote }];
        case FolderActionType.DeleteFolder:
        return state.filter(folder => folder.path !== action.path);
    }

    return state;
};