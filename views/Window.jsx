import React from 'react';

export const Window = (props) => (
    <div className="window">
        <div className="window-content">
            { props.children }
        </div>
        <footer className="toolbar toolbar-footer">
            <div className="toolbar-actions">
                <button className="btn btn-default pull-right">
                    <span className="icon icon-left-circled"></span>
                </button>
            </div>
        </footer>
    </div>
);