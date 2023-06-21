import { toIterable } from './util/toIterable';

export function* concat<T>(...iters: Array<Iterator<T>>) {
    for (const iter of iters) {
        yield* iter;
    }
}

