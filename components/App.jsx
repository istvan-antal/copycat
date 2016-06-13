import React from 'react';
import { connect } from 'react-redux';
import { addSyncFolder } from '../store/actions/synclist';
import { startSync, stopSync } from '../store/actions/sync';
import { switchCurrentView } from '../store/actions/currentView';
import { Window } from '../views/Window';
import { HomeScreen } from '../views/HomeScreen';
import { SyncFolderList } from '../views/SyncFolderList';
import { ProgressScreen } from '../views/ProgressScreen';

const AppView = (props) => {
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

const mapDispatchToProps = (dispatch) => ({
    switchCurrentView: (view) => {
        dispatch(switchCurrentView(view));
    },
    addSyncFolder: (localPath, remotePath) => {
        dispatch(addSyncFolder(localPath, remotePath));
    },
    startSync: (syncType) => {
        dispatch(startSync(syncType));
        dispatch(switchCurrentView('ProgressScreen'));
    },
    stopSync: () => {
        dispatch(stopSync());
        dispatch(switchCurrentView('HomeScreen'));
    }
});

const mapStateToProps = (state) => state;

export const App = connect(mapStateToProps, mapDispatchToProps)(AppView);