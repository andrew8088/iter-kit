import { describe, it } from 'vitest'
import { range } from '../src/range';
import { filter } from '../src/filter';
import { expectArray } from './testUtils';

describe('filter', () => {
    it('filters', () => {
        expectArray(
            filter(range(0, 3), (n) => n % 2 === 0),
            [0, 2]
        );
    });
});
