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

    it('should correctly parse outputs where file is bigger than 10MB', () => {
        expect(getProgressValues('44,629,165  24%   42.06MB/s    0:00:03')).toEqual({
            percentage: 24,
            speedText: '42.06MB/s'
        });
    });
});