import React from 'react';

import './ProgressScreen.css';

export const ProgressScreen = ({ progress }) => (
    <div className="outer">
        <div className="middle">
            <div className="inner">
                <div>
                    { progress.description }
                </div>
                <div>
                    <progress max="100" value={ progress.percentage || 0.1 }/>
                </div>
                <div>
                    { progress.speedText }
                </div>
            </div>
        </div>
    </div>
);