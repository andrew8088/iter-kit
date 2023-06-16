import { describe, it } from 'vitest'
import { take } from '../src/take';
import { range } from '../src/range';
import { expectArray } from './testUtils';

describe('take', () => {
    it('chooses a number of elements', () => {
        expectArray(take(range(), 2), [0, 1]);
    });

    it('ends early if the Iterator has fewer elements than needed', () => {
        expectArray(take(take(range(), 2), 3), [0, 1]);
    });
});
