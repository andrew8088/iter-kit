type It<T> = Iterator<T>;
export function zip<T1, T2, T3, T4>(it1: It<T1>, it2: It<T2>, it3: It<T3>, it4: It<T4>): It<[T1, T2]>;
export function zip<T1, T2, T3>(it1: It<T1>, it2: It<T2>, it3: It<T3>): It<[T1, T2]>;
export function zip<T1, T2>(it1: It<T1>, it2: It<T2>): It<[T1, T2]>;
export function* zip<T>(...iters: Array<It<T>>): It<T[]> {
    while (true) {
        const nextTuple = [];

        for (const iter of iters) {
            const next = iter.next();

            if (next.done) {
                return;
            }
            nextTuple.push(next.value);
        }

        yield nextTuple;
    }
}
