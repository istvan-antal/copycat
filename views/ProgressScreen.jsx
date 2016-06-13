import React from 'react';

export const ProgressScreen = ({ progress }) => (
    <ul className="list-group">
        <li className="list-group-item">
            { progress.description }
            <progress max="100" value={ progress.percentage || 0.1 }>
            </progress>
            { progress.speedText }
        </li>
    </ul>
);