import test                  from 'ava';
import shuffle               from 'shuffle-array';
import { exact, head, tail } from '../src/set-order';
import by                    from 'sort-by';

test.beforeEach(t => {
    t.context.original  = ['Studio', 1, 2, 3, 4, 5, 'etc...'];
    t.context.primitive = shuffle([...t.context.original]);
    t.context.complex   = t.context.primitive.map(bedrooms => ({ bedrooms }));
});

test('Should be able to custom sort using primitives as input;', t => {

    const xss1 = t.context.primitive.sort(exact(['Studio', 1, 2, 3, 4, 5, 'etc...'], (a, b) => a - b));
    t.deepEqual(xss1, t.context.original);

});

test('Should be able to custom sort using manual enumeration;', t => {

    const xss = t.context.primitive.sort(exact([
        { value: 'Studio' },
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 'etc...' },
    ]));
    t.deepEqual(xss, t.context.original);

    const xss2 = t.context.complex.sort(exact([
        { property: 'bedrooms', value: 'Studio' },
        { property: 'bedrooms', value: 1 },
        { property: 'bedrooms', value: 2 },
        { property: 'bedrooms', value: 3 },
        { property: 'bedrooms', value: 4 },
        { property: 'bedrooms', value: 5 },
        { property: 'bedrooms', value: 'etc...' },
    ]));
    t.deepEqual(xss2, t.context.original.map(bedrooms => ({ bedrooms })));

});

test('Should be able to custom sort using optional sort function;', t => {

    const xss1 = t.context.primitive.sort(exact([
        { value: 'Studio' },
        { value: 'etc...', position: tail },
    ], (a, b) => a - b));
    t.deepEqual(xss1, t.context.original);

    const xss2 = t.context.complex.sort(exact([
        { property: 'bedrooms', value: 'Studio' },
        { property: 'bedrooms', value: 'etc...', position: tail },
    ], by('bedrooms')));
    t.deepEqual(xss2, t.context.original.map(bedrooms => ({ bedrooms })));

});
