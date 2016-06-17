import React from 'react';

export const Footer = ({ currentView, switchCurrentView }) => {
    const toolbarItems = [];

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