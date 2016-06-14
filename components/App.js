import { connect } from 'react-redux';
import { addSyncFolder } from '../store/actions/synclist';
import { startSync, stopSync } from '../store/actions/sync';
import { switchCurrentView } from '../store/actions/currentView';
import { App as AppView } from '../views/App';

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