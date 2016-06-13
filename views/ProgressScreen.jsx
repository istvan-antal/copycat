import React from 'react';

export const ProgressScreen = ({ progress }) => (
    <ul className="list-group">
        <li className="list-group-item">
            <progress max="100" value={ progress.percentage || 0.1 }/>
        </li>
    </ul>
);