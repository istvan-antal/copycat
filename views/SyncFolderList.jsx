import React from 'react';
import { SyncFolderFormRow } from './SyncFolderFormRow';

export const SyncFolderList = ({ synclist, addSyncFolder, removeSyncFolder }) => (
    <table className="table-striped">
        <thead>
            <tr>
                <th>Remote</th>
                <th>Local</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {synclist.map((syncfolder, index) => (
                <tr key={index}>
                    <td>{syncfolder.localPath}</td>
                    <td>{syncfolder.remotePath}</td>
                    <td>
                        <span
                            onClick={() => { removeSyncFolder(index); }}
                            className="icon icon-minus-circled">
                        </span>
                    </td>
                </tr>
            ))}
            <SyncFolderFormRow addSyncFolder={ addSyncFolder}/>
        </tbody>
    </table>
);