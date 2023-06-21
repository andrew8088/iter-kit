import { describe, it } from 'vitest'
import { map, range, filter } from '../src/async';
import { expectAsyncArray } from './testUtils';

describe('async', () => {
    describe('map', () => {
        it('maps', async () => {
            await expectAsyncArray(
                filter(range(0, 3), (n) => n % 2 === 0),
                [0, 2]
            );
        });
    });

    describe('map', () => {
        it('maps', async () => {
            await expectAsyncArray(
                map(range(0, 3, 0.5), (n) => n - 2),
                [-2, -1.5, -1, -0.5, 0, 0.5, 1]
            );
        });
    });
});
