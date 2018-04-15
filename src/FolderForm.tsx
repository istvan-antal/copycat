import * as React from 'react';
import { actions } from './actions';

interface Prop {
    path: string;
    addFolder: typeof actions['addFolder'];
    browseForFolder: typeof actions['browseForFolder'];
    setFolderPath: typeof actions['setFolderPath'];
}

export default class FolderForm extends React.Component<Prop> {
    render() {
        return (
            <form>
                <input value={this.props.path} onChange={e => { this.props.setFolderPath(e.target.value); }} type="text" />
                <button onClick={e => { this.props.browseForFolder(); e.preventDefault(); }}>Browse</button>
                <button onClick={e => { this.props.addFolder(this.props.path); this.props.setFolderPath(''); e.preventDefault(); }}>Create</button>
            </form>
        );
    }
}