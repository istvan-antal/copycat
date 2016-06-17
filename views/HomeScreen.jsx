import React from 'react';

import './HomeScreen.css';

export const HomeScreen = ({ switchCurrentView, startSync }) => (
    <div className="btn-group home-screen">
        <button
            onClick={ () => switchCurrentView('SyncFolderList') }
            className="btn btn-default">
                Synclist
        </button>
        <button key="pull" className="btn btn-default"
            onClick={ () => { startSync('pull'); } }>
            Pull
        </button>
        <button key="push" className="btn btn-default"
            onClick={ () => { startSync('push'); } }>
            Push
        </button>
    </div>
);