import React from 'react';

export const Window = ({ children, switchCurrentView }) => (
    <div className="window">
        <div className="window-content">
            { children }
        </div>
        <footer className="toolbar toolbar-footer">
            <div className="toolbar-actions">
                <button className="btn btn-default pull-right"
                    onClick={ () => switchCurrentView('HomeScreen') }>
                    <span className="icon icon-left-circled"></span>
                </button>
            </div>
        </footer>
    </div>
);