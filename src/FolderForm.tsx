import * as React from 'react';
import { actions } from './actions';

interface Prop {
    path: string;
    remote: string;
    addFolder: typeof actions['addFolder'];
    browseForFolder: typeof actions['browseForFolder'];
    setFolderPath: typeof actions['setFolderPath'];
    setRemotePath: typeof actions['setRemotePath'];
}

export default class FolderForm extends React.Component<Prop> {
    render() {
        return (
            <form>
                <input value={this.props.path} onChange={e => { this.props.setFolderPath(e.target.value); }} type="text" />
                <button onClick={e => { this.props.browseForFolder(); e.preventDefault(); }}>Browse</button>
                <input value={this.props.remote} onChange={e => { this.props.setRemotePath(e.target.value); }} type="text" />
                <button
                    onClick={e => {
                        this.props.addFolder(this.props.path, this.props.remote);
                        this.props.setFolderPath('');
                        this.props.setRemotePath('');
                        e.preventDefault();
                    }}
                >
                    Create
                </button>
            </form>
        );
    }
}