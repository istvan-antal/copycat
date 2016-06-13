import React from 'react';

function formatDescription(description) {
    if (description < 50) {
        return description;
    }
    return '...' + description.slice(-50);
}

export const ProgressScreen = ({ progress }) => (
    <ul className="list-group">
        <li className="list-group-item">
            { formatDescription(progress.description) }
            <progress max="100" value={ progress.percentage || 0.1 }>
            </progress>
            { progress.speedText }
        </li>
    </ul>
);