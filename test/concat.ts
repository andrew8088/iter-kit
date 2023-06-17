import { describe, it } from 'vitest'
import { range } from '../src/range';
import { concat } from '../src/concat';
import { expectArray } from './testUtils';

describe('concat', () => {
    it('concatenates multiple iterators together', () => {
        expectArray(
            concat(range(0, 1), range(101, 103), range(-3, -2)),
            [0, 1, 101, 102, 103, -3, -2]
        );
    });
});
