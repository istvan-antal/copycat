import { createStore, combineReducers, applyMiddleware } from 'redux';
// import createLogger from 'redux-logger';
import { synclist } from './reducers/synclist';
import { currentView } from './reducers/currentView';
import { progress } from './reducers/progress';
import { sync } from './reducers/sync';

export default function configureStore(backend) {
    // const logger = createLogger();
    const initialSate = backend.getInitialState();

    return createStore(combineReducers({
        currentView,
        synclist,
        progress,
        sync
    }), initialSate, applyMiddleware(/* logger, */...backend.middlewares));
}