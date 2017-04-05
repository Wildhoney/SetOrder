import test from 'ava';
import { exact, head, tail } from '../src/set-order';
import by from 'sort-by';

test('Should be able to custom sort on primitives using primitives as input;', t => {

    const xs  = [1, 'etc...', 2, 5, 3, 4, 'Studio'];
    const xss = xs.sort(exact(['Studio', 1, 2, 3, 4, 5, 'etc...'], (a, b) => a - b));

    t.deepEqual(xss, ['Studio', 1, 2, 3, 4, 5, 'etc...']);

});

test('Should be able to custom sort on primitives using manual enumeration;', t => {

    const xs  = [1, 'etc...', 2, 5, 3, 4, 'Studio'];
    const xss = xs.sort(exact([
        { value: 'Studio' },
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 'etc...' },
    ]));

    t.deepEqual(xss, ['Studio', 1, 2, 3, 4, 5, 'etc...']);

});

test('Should be able to custom sort on primitives using optional sort function;', t => {

    const xs  = [1, 'etc...', 2, 5, 3, 4, 'Studio'];
    const xss = xs.sort(exact([
        { value: 'Studio' },
        { value: 'etc...', position: tail },
    ], (a, b) => a - b));

    t.deepEqual(xss, ['Studio', 1, 2, 3, 4, 5, 'etc...']);

});
