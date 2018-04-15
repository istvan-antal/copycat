import { FolderFormAction, FolderFormActionType } from '../actions/folderForm';
import { AnyAction } from 'redux';

export interface FolderForm {
    path: string;
};

export const folderForm = (state: FolderForm = { path: '' }, action: FolderFormAction): FolderForm => {
    
    switch (action.type) {
        case FolderFormActionType.SetFolderPath:
        return {
            ...state,
            path: action.path,
        };
    }

    return state;
};