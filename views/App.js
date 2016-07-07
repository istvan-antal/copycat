import React from 'react';
import { Window } from '../views/Window';
import { SyncFolderList } from '../views/SyncFolderList';
import { ProgressScreen } from '../views/ProgressScreen';

export const App = (props) => {
    let currentView;

    switch (props.currentView) {
    case 'ProgressScreen':
        currentView = (
            <ProgressScreen progress={ props.progress } stopSync={ props.stopSync }/>
        );
        break;
    default:
        currentView = (
            <SyncFolderList
                synclist={props.synclist}
                addSyncFolder={props.addSyncFolder}
                removeSyncFolder={props.removeSyncFolder}
            />
        );
    }
    return (
        <Window {...props}>
            {currentView}
        </Window>
    );
};