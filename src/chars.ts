import { range } from './range';
import { map } from './map';

export function chars(start = 'a', end = 'z') {
    return map(range(start.charCodeAt(0), end.charCodeAt(0)), (n) => String.fromCharCode(n));
}
