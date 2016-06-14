import React from 'react';

function formatDescription(description) {
    if (description < 50) {
        return description;
    }
    return '...' + description.slice(-50);
}

export const ProgressScreen = ({ progress }) => (
    <div style={ { padding: 10, textAlign: 'center' } }>
        <div>
            { formatDescription(progress.description) }
        </div>
        <div>
            <progress max="100" value={ progress.percentage || 0.1 }/>
        </div>
        <div>
            { progress.speedText }
        </div>
    </div>
);