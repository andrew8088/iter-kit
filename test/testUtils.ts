import { expect } from 'vitest'

export function expectArray<T>(iter: Iterable<T>, arr: Array<T>) {
    expect(Array.from(iter)).toEqual(arr);
}

