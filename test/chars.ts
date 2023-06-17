import { describe, it } from 'vitest'
import { chars } from '../src/chars';
import { expectArray } from './testUtils';

describe('map', () => {
    it('maps', () => {
        expectArray(
            chars('a', 'c'),
            ['a', 'b', 'c']
        );
    });
});
