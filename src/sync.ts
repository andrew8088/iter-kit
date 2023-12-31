type I<T> = Iterable<T>;
export function chars(start = "a", end = "z") {
  return map(range(start.charCodeAt(0), end.charCodeAt(0)), (n) =>
    String.fromCharCode(n)
  );
}
export function* concat<T>(...iters: Array<I<T>>) {
  for (const iter of iters) {
    yield* iter;
  }
}
export function* filter<T>(iter: I<T>, fn: (t: T) => boolean) {
  for (const next of iter) {
    if (fn(next)) {
      yield next;
    }
  }
}
export function* map<T, R>(iter: I<T>, fn: (t: T) => R) {
  for (const item of iter) {
    yield fn(item);
  }
}
export function* range(start = 0, end = Infinity) {
  while (start <= end) {
    yield start++;
  }
}
export function* take<T>(iter: I<T>, count: number) {
  let yielded = 0;
  for (const next of iter) {
    yield next;
    if (++yielded === count) return;
  }
}
export function* takeWhile<T>(iter: I<T>, fn: (t: T) => boolean) {
  for (const next of iter) {
    if (!fn(next)) return;
    yield next;
  }
}
export function zip<T1, T2, T3, T4>(
  it1: I<T1>,
  it2: I<T2>,
  it3: I<T3>,
  it4: I<T4>
): I<[T1, T2, T3, T4]>;
export function zip<T1, T2, T3>(
  it1: I<T1>,
  it2: I<T2>,
  it3: I<T3>
): I<[T1, T2, T3]>;
export function zip<T1, T2>(it1: I<T1>, it2: I<T2>): I<[T1, T2]>;
export function* zip<T>(...iters: Array<I<T>>): I<T[]> {
  while (true) {
    const nextTuple = [];
    const iterators = iters.map((it) => it[Symbol.iterator]());
    for (const iter of iterators) {
      const next = iter.next();
      if (next.done) {
        return;
      }
      nextTuple.push(next.value);
    }
    yield nextTuple;
  }
}
class Chainable<T> implements Iterable<T> {
  #iter: Iterable<T>;
  constructor(iter: Iterable<T>) {
    this.#iter = iter;
  }
  take(count: number) {
    return new Chainable(take(this.#iter, count));
  }
  takeWhile(fn: (t: T) => boolean) {
    return new Chainable(takeWhile(this.#iter, fn));
  }
  concat(...iters: Iterable<T>[]) {
    return new Chainable(concat(this.#iter, ...iters));
  }
  filter(fn: (t: T) => boolean) {
    return new Chainable(filter(this.#iter, fn));
  }
  map<S>(fn: (t: T) => S) {
    return new Chainable(map(this.#iter, fn));
  }
  zip<S>(iter: Iterable<S>) {
    return new Chainable(zip(this.#iter, iter));
  }
  *[Symbol.iterator]() {
    yield* this.#iter;
  }
}
export function pipe<T>(iter: Iterable<T>) {
  return new Chainable(iter);
}
