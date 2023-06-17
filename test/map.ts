import { describe, it } from 'vitest'
import { range } from '../src/range';
import { map } from '../src/map';
import { expectArray } from './testUtils';

describe('map', () => {
    it('maps', () => {
        expectArray(
            map(range(0, 3), (n) => n - 2),
            [-2, -1, 0, 1]
        );
    });
});
