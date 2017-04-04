import test from 'ava';
import { exact, head, tail } from '../src/exact-order';
import by from 'sort-by';

test('Should be able to custom sort on primitives;', t => {

    const xs  = [1, 'etc...', 2, 5, 3, 4, 'Studio'];
    const xss = exact(xs, [
        { value: 'Studio', position: head },
        { value: 'etc...', position: tail },
    ], (a, b) => a - b);

    t.deepEqual(xss, ['Studio', 1, 2, 3, 4, 5, 'etc...']);

});
