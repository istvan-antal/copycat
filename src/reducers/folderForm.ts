import { FolderFormAction, FolderFormActionType } from '../actions/folderForm';
import { AnyAction } from 'redux';

export interface FolderForm {
    path: string;
    remote: string;
};

export const folderForm = (state: FolderForm = { path: '', remote: '' }, action: FolderFormAction): FolderForm => {
    
    switch (action.type) {
        case FolderFormActionType.SetFolderPath:
        return {
            ...state,
            path: action.path,
        };
    }

    return state;
};