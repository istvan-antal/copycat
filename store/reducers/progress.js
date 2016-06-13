import { UPDATE_PROGRESS } from '../actions/progress';

export const progress = (state = { percentage: 0, speedText: '0B/s' }, action) => {
    switch (action.type) {
    case UPDATE_PROGRESS:
        return action.progress;
    default:
        return state;
    }
};