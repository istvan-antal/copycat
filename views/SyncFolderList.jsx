import React from 'react';

export const SyncFolderList = (props) => (
    <table className="table-striped">
        <thead>
            <tr>
                <th>Remote</th>
                <th>Local</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {props.synclist.map((syncfolder, index) => (
                <tr key={index}>
                    <td>{syncfolder.localPath}</td>
                    <td>{syncfolder.remotePath}</td>
                    <td>
                    </td>
                </tr>
            ))}
            <tr>
                <td><input type="text"/></td>
                <td><input type="text"/></td>
                <td>
                    <button
                        className="btn btn-default"
                        onClick={ () => props.addSyncFolder('foo', 'bar') }>
                        Add
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
);