import { FolderAction, FolderActionType } from '../actions/folders';
import { AnyAction } from 'redux';

export type FolderList = Array<{
    path: string;
    remote: string;
}>;

export const folders = (state: FolderList = [], action: FolderAction): FolderList => {
    switch (action.type) {
        case FolderActionType.AddFolder:
        return [...state, { path: action.path, remote: action.remote }];
        case FolderActionType.DeleteFolder:
        return state.filter(folder => folder.path !== action.path);
    }

    return state;
};