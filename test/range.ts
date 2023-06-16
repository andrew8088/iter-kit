import { describe, it, expect } from 'vitest'
import { range } from '../src/range';
import { take } from '../src/take';

describe('range', () => {
    it('includes start and end', () => {
        expect(Array.from(range(0, 3))).toEqual([0, 1, 2, 3]);
    });

    it('is empty if end is greater than start', () => {
        expect(Array.from(range(3, 0))).toEqual([]);
    });

    it('includes 1 item if start and end are the same', () => {
        expect(Array.from(range(3, 3))).toEqual([3]);
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
