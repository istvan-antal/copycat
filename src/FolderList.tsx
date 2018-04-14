import * as React from 'react';
import { FolderList as FolderListType } from './reducers/folders';

interface Props {
    folders: FolderListType;
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
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}