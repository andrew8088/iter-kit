import { describe, it } from 'vitest'
import { take } from '../src/take';
import { range } from '../src/range';
import { zip } from '../src/zip';
import { chars } from '../src/chars';
import { expectArray } from './testUtils';

describe('zip', () => {
    it('zips elements of multiple iterators', () => {
        const i1 = range();
        const i2 = chars();

        const i3 = take(zip(i1, i2), 2);
        expectArray(i3, [[0, 'a'], [1, 'b']]);
    });
});