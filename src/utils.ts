export async function* toAsync<T>(iter: Iterable<T>): AsyncIterable<T> {
  for (const next of iter) {
    yield await Promise.resolve(next);
  }
}

export function curryIter<T, S, Args extends unknown[]>(
  fn: (iter: Iterable<T>, ...rest: Args) => Iterable<S>,
  ...args: Args
): (iter: Iterable<T>) => Iterable<S> {
  return (iter: Iterable<T>) => fn(iter, ...args);
}

export function pipeSync<A, B, C, D>(
  iter: Iterable<A>,
  fn1: (iter: Iterable<A>) => Iterable<B>,
  fn2: (iter: Iterable<B>) => Iterable<C>,
  fn3: (iter: Iterable<C>) => Iterable<D>
): Iterable<D>;
export function pipeSync<A, B, C>(
  iter: Iterable<A>,
  fn1: (iter: Iterable<A>) => Iterable<B>,
  fn2: (iter: Iterable<B>) => Iterable<C>
): Iterable<C>;
export function pipeSync<A, B>(
  iter: Iterable<A>,
  fn: (iter: Iterable<A>) => Iterable<B>
): Iterable<B>;
export function pipeSync(
  iter: Iterable<unknown>,
  ...fns: ((iter: Iterable<unknown>) => Iterable<unknown>)[]
): Iterable<unknown> {
  let next = iter;
  for (const fn of fns) {
    next = fn(next);
  }
  return next;
}

export function pipe<T>(
  iter: AsyncIterable<T>,
  fn: (iter: AsyncIterable<T>) => AsyncIterable<T>
): AsyncIterable<T> {
  return fn(iter);
}
