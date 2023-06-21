export async function* toAsync<T>(iter: Iterable<T>): AsyncIterable<T> {
  for (const next of iter) {
    yield await Promise.resolve(next);
  }
}
