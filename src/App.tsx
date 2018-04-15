import * as React from 'react';
import { AppState } from './reducers';
import { actions } from './actions';
import FolderForm from './FolderForm';
import FolderList from './FolderList';

interface Props extends AppState {
    actions: typeof actions;
}

export default class App extends React.Component<Props> {
    render() {
        return (
            <div>
                <FolderForm
                    path={this.props.folderForm.path}
                    addFolder={this.props.actions.addFolder}
                    browseForFolder={this.props.actions.browseForFolder}
                    setFolderPath={this.props.actions.setFolderPath}
                />
                <FolderList folders={this.props.folders} />
            </div>
        );
    }
}