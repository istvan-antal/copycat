import React from 'react';
import { Footer } from './Footer';

export const Window = ({ children, startSync, stopSync, currentView, switchCurrentView }) => (
    <div className="window">
        <div className="window-content">
            { children }
        </div>
        <Footer { ...{ startSync, stopSync, currentView, switchCurrentView } }/>
    </div>
);