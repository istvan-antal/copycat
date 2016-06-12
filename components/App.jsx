import React from 'react';
import { connect } from 'react-redux';
import { addSyncFolder } from '../store/actions/synclist';
import { switchCurrentView } from '../store/actions/currentView';
import { Window } from '../views/Window';
import { HomeScreen } from '../views/HomeScreen';
import { SyncFolderList } from '../views/SyncFolderList';

const AppView = (props) => {
    let currentView;

    switch (props.currentView) {
    case 'SyncFolderList':
        currentView = (
            <SyncFolderList synclist={props.synclist} addSyncFolder={props.addSyncFolder}/>)
        ;
        break;
    default:
        currentView = <HomeScreen switchCurrentView={props.switchCurrentView}/>;
    }
    return (
        <Window currentView={props.currentView} switchCurrentView={props.switchCurrentView}>
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
    }
});

const mapStateToProps = (state) => state;

export const App = connect(mapStateToProps, mapDispatchToProps)(AppView);