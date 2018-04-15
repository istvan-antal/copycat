import * as React from 'react';
import { actions } from './actions';
import { FolderList as FolderListType } from './reducers/folders';

interface Props {
    folders: FolderListType;
    deleteFolder: typeof actions['deleteFolder'];
}

export default class FolderList extends React.Component<Props> {
    render() {
        return (
            <table>
                <tbody>
                    {!this.props.folders.length &&
                        <tr>
                            <td>
                                No folders.
                            </td>
                        </tr>
                    }
                    {this.props.folders.map(folder => (
                        <tr key={folder.path}>
                            <td>
                                {folder.path}
                            </td>
                            <td>
                                <button
                                    onClick={e => {
                                        this.props.deleteFolder(folder.path);
                                        e.preventDefault();
                                    }}
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}