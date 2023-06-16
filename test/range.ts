import { describe, it, expect } from 'vitest'
import { range } from '../src/range';
import { take } from '../src/take';
import { expectArray } from './testUtils';

describe('range', () => {
    it('includes start and end', () => {
        expectArray(range(0, 3), [0, 1, 2, 3]);
    });

    it('is empty if end is greater than start', () => {
        expectArray(range(3, 0), []);
    });

    it('includes 1 item if start and end are the same', () => {
        expectArray(range(3, 3), [3]);
    });

    it('goes to infinity if no end is provided', () => {
        const arr = Array.from(take(range(0), 10_000));
        expect(arr.length).toEqual(10000);
        for (let i = 0; i < arr.length; i++) {
            expect(arr[i]).toBe(i);
        }
    });

    it('starts at zero if no start is provided', () => {
        const arr = Array.from(take(range(), 10_000));
        expect(arr.length).toEqual(10000);
        for (let i = 0; i < arr.length; i++) {
            expect(arr[i]).toBe(i);
        }
    });
});
