import { describe, it } from 'vitest'
import { toAsync } from '../src/utils';
import { range } from '../src/sync';
import { expectAsyncArray } from './testUtils';

describe('toAsync', () => {
    it('wraps items from an iterator in promises', async () => {
        await expectAsyncArray(
            toAsync(range(0, 3)),
            [0, 1, 2, 3]
        );
    });
});
