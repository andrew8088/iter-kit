import { expect } from "vitest";

export function expectArray<T>(iter: Iterable<T>, arr: Array<T>) {
  expect(Array.from(iter)).toEqual(arr);
}

export async function expectAsyncArray<T>(
  iter: AsyncIterable<T>,
  arr: Array<T>
) {
  const result: Array<T> = [];
  for await (const next of iter) {
    result.push(next);
  }
  expect(result).toEqual(arr);
}
