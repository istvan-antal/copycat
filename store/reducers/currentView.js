import { SWITCH_CURRENT_VIEW } from '../actions/currentView';

export const currentView = (state = 'HomeScreen', action) => {
    switch (action.type) {
    case SWITCH_CURRENT_VIEW:
        return action.view;
    default:
        return state;
    }
};