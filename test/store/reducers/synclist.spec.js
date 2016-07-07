import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { synclist } from '../../../store/reducers/synclist';
import { addSyncFolder, removeSyncFolder } from '../../../store/actions/synclist';

describe('store/reducers/synclist', () => {
    const initialSate = deepFreeze([]);

    it('return empty array for initial state', () => {
        expect(synclist(undefined, { type: 'initial' })).toEqual([]);
    });

    it('should append new syncfolder on addSyncFolder', () => {
        const oneItem = synclist(
            initialSate,
            addSyncFolder('~/Downloads', 'myserver:~/Downloads')
        );

        expect(oneItem).toEqual([
            { localPath: '~/Downloads', remotePath: 'myserver:~/Downloads' }
        ]);

        const twoItems = synclist(
            deepFreeze(oneItem),
            addSyncFolder('~/Downloads2', 'myserver:~/Downloads2')
        );

        expect(
            twoItems
        ).toEqual([
            { localPath: '~/Downloads', remotePath: 'myserver:~/Downloads' },
            { localPath: '~/Downloads2', remotePath: 'myserver:~/Downloads2' }
        ]);
    });

    it('should remove syncfolder', () => {
        expect(
            synclist(
                [
                    { localPath: '~/Downloads', remotePath: 'myserver:~/Downloads' },
                    { localPath: '~/Downloads2', remotePath: 'myserver:~/Downloads2' },
                    { localPath: '~/Downloads3', remotePath: 'myserver:~/Downloads3' }
                ],
                removeSyncFolder(1)
            )
        ).toEqual([
            { localPath: '~/Downloads', remotePath: 'myserver:~/Downloads' },
            { localPath: '~/Downloads3', remotePath: 'myserver:~/Downloads3' }
        ]);

        expect(
            synclist(
                [
                    { localPath: '~/Downloads', remotePath: 'myserver:~/Downloads' },
                    { localPath: '~/Downloads2', remotePath: 'myserver:~/Downloads2' },
                    { localPath: '~/Downloads3', remotePath: 'myserver:~/Downloads3' }
                ],
                removeSyncFolder(0)
            )
        ).toEqual([
            { localPath: '~/Downloads2', remotePath: 'myserver:~/Downloads2' },
            { localPath: '~/Downloads3', remotePath: 'myserver:~/Downloads3' }
        ]);
    });
});