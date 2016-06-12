import React from 'react';

export class SyncFolderFormRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localPath: '',
            remotePath: ''
        };
    }
    render() {
        return (
            <tr>
                <td>
                    <input
                        onChange={ (e) => { this.setState({ localPath: e.target.value }); } }
                        type="text"/>
                </td>
                <td>
                    <input
                        onChange={ (e) => { this.setState({ remotePath: e.target.value }); } }
                        type="text"/>
                </td>
                <td>
                    <button
                        className="btn btn-default"
                        onClick={ () => {
                            this.props.addSyncFolder(this.state.localPath, this.state.remotePath);
                        } }>
                        Add
                    </button>
                </td>
            </tr>
        );
    }
}