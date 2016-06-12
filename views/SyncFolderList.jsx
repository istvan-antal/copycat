import React from 'react';
import { SyncFolderFormRow } from './SyncFolderFormRow';

export const SyncFolderList = ({ synclist, addSyncFolder }) => (
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
                    </td>
                </tr>
            ))}
            <SyncFolderFormRow addSyncFolder={ addSyncFolder}/>
        </tbody>
    </table>
);