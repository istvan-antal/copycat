import { FolderAction, FolderActionType, FolderStatus } from '../actions/folders';
import { AnyAction } from 'redux';

export interface Folder {
    status: FolderStatus;
    path: string;
    remote: string;
}

export type FolderList = Folder[];

export const folders = (state: FolderList = [], action: FolderAction): FolderList => {
    switch (action.type) {
    case FolderActionType.AddFolder:
        return [...state, { status: FolderStatus.Idle, path: action.path, remote: action.remote }];
    case FolderActionType.DeleteFolder:
        return state.filter(folder => folder.path !== action.path);
    case FolderActionType.UpdateFolderStatus:
        return state.map(item => {
            if (item.path === action.path) {
                return {
                    ...item,
                    status: action.status,
                };
            }
            return item;
        });
    }

    return state;
};