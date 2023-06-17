import { describe, it } from 'vitest'
import { range } from '../src/range';
import { takeUntil } from '../src/takeUntil';
import { concat } from '../src/concat';
import { expectArray } from './testUtils';

describe('takeUntil', () => {
    it('takes values until one matches a predicate', () => {
        expectArray(
            takeUntil(concat(range(0, 3), range(0, 3)), (n) => n < 3),
            [0, 1, 2]
        );
    });
});
