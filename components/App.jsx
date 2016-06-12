import React from 'react';
import { connect } from 'react-redux';
import { addSyncFolder } from '../store/actions/synclist';
import { Window } from '../views/Window';
import { SyncFolderList } from '../views/SyncFolderList';

const AppView = (props) => (
    <Window>
        <SyncFolderList synclist={props.synclist} addSyncFolder={props.addSyncFolder}/>
    </Window>
);

const mapDispatchToProps = (dispatch) => ({
    addSyncFolder: (localPath, remotePath) => {
        dispatch(addSyncFolder(localPath, remotePath));
    }
});

const mapStateToProps = (state) => state;

export const App = connect(mapStateToProps, mapDispatchToProps)(AppView);