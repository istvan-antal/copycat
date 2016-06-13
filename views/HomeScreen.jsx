import React from 'react';

export const HomeScreen = ({ switchCurrentView }) => (
    <ul className="list-group">
        <li className="list-group-item">
            <button
                onClick={ () => switchCurrentView('SyncFolderList') }
                className="btn btn-default">
                    Synclist
            </button>
            <button
                onClick={ () => switchCurrentView('SyncFolderList') }
                className="btn btn-default">
                    Synclist
            </button>
        </li>
    </ul>
);