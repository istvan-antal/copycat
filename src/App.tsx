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
                <FolderForm addFolder={this.props.actions.addFolder} />
                <FolderList folders={this.props.folders} />
            </div>
        );
    }
}