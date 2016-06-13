import { START_SYNC, STOP_SYNC } from '../actions/sync';

export const sync = (state = null, action) => {
    switch (action.type) {
    case START_SYNC:
        return action.syncType;
    case STOP_SYNC:
        return null;
    default:
        return state;
    }
};