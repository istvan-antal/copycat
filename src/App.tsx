import * as React from 'react';
import { AppState } from './reducers';
import { actions } from './actions';
import FolderForm from './FolderForm';
import FolderList from './FolderList';
import './App.scss';

interface Props extends AppState {
    actions: typeof actions;
}

export default class App extends React.Component<Props> {
    render() {
        return (
            <div>
                <FolderForm
                    {...this.props.folderForm}
                    addFolder={this.props.actions.addFolder}
                    browseForFolder={this.props.actions.browseForFolder}
                    setFolderPath={this.props.actions.setFolderPath}
                    setRemotePath={this.props.actions.setRemotePath}
                />
                <FolderList folders={this.props.folders} deleteFolder={this.props.actions.deleteFolder} />
            </div>
        );
    }
}