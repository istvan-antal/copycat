import expect from 'expect';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { trimOutput, isProgressLine, getProgressValues } from '../../sync/rsyncOutputParser';

describe('sync/rsyncOutputParser', () => {
    const lineString = trimOutput(readFileSync(resolve(__dirname, 'line.txt')));

    it('should tell if a buffer is a progress line', () => {
        expect(isProgressLine(lineString)).toEqual(true);
    });

    it('should provide the extraced values from a progress line', () => {
        expect(getProgressValues(lineString)).toEqual({
            percentage: 9,
            speedText: '9.41MB/s'
        });
    });
});