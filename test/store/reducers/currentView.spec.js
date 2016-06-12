import expect from 'expect';
import { currentView } from '../../../store/reducers/currentView';
import { switchCurrentView } from '../../../store/actions/currentView';

describe('store/reducers/currentView', () => {
    it('should return HomeScreen for initial state', () => {
        expect(currentView(undefined, { type: null })).toEqual('HomeScreen');
    });

    it('should switch current view', () => {
        expect(
            currentView(undefined, switchCurrentView('SyncFolderList'))
        ).toEqual('SyncFolderList');
    });
});