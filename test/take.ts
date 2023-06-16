import { describe, it, expect } from 'vitest'
import { take } from '../src/take';

function* numbers() {
    let i = 0;
    while (true) yield i++;
}

describe('take', () => {
    it('chooses a number of elements', () => {
        expect(Array.from(take(numbers(), 2))).toEqual([0, 1]);
    });

    it('ends early if the Iterator has fewer elements than needed', () => {
        expect(Array.from(take(take(numbers(), 2), 3))).toEqual([0, 1]);
    });
});
