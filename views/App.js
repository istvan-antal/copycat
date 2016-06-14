import React from 'react';
import { Window } from '../views/Window';
import { HomeScreen } from '../views/HomeScreen';
import { SyncFolderList } from '../views/SyncFolderList';
import { ProgressScreen } from '../views/ProgressScreen';

export const App = (props) => {
    let currentView;

    switch (props.currentView) {
    case 'SyncFolderList':
        currentView = (
            <SyncFolderList synclist={props.synclist} addSyncFolder={props.addSyncFolder}/>
        );
        break;
    case 'ProgressScreen':
        currentView = (
            <ProgressScreen progress={ props.progress }/>
        );
        break;
    default:
        currentView = <HomeScreen switchCurrentView={props.switchCurrentView}/>;
    }
    return (
        <Window {...props}>
            {currentView}
        </Window>
    );
};