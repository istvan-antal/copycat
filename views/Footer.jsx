import React from 'react';

export const Footer = ({ startSync, stopSync, currentView, switchCurrentView }) => {
    const toolbarItems = [];

    if (currentView === 'ProgressScreen') {
        toolbarItems.unshift(
            <button key="stop" className="btn btn-default pull-right"
                onClick={ stopSync }>
                Stop
            </button>
        );
    } else {
        toolbarItems.unshift(
            <button key="pull" className="btn btn-default pull-right"
                onClick={ () => { startSync('pull'); } }>
                Pull
            </button>
        );
        toolbarItems.unshift(
            <button key="push" className="btn btn-default pull-right"
                onClick={ () => { startSync('push'); } }>
                Push
            </button>
        );
    }

    if (currentView !== 'HomeScreen') {
        toolbarItems.unshift(
            <button key="home" className="btn btn-default pull-right"
                onClick={ () => switchCurrentView('HomeScreen') }>
                <span className="icon icon-left-circled"></span>
            </button>
        );
    }

    return (
        <footer className="toolbar toolbar-footer">
            <div className="toolbar-actions">
                {toolbarItems}
            </div>
        </footer>
    );
};