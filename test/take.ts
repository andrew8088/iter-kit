import { describe, it, expect } from 'vitest'
import { take } from '../src/take';

describe('take', () => {
    it('returns', () => {
        expect(take(1)).toBe(1);
    });
});
