import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { synclist } from './reducers/synclist';

export default function configureStore() {
    const logger = createLogger();
    return createStore(combineReducers({
        synclist
    }), {}, applyMiddleware(logger));
}