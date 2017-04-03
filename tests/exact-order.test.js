import test from 'ava';
import as from '../src/exact-order';

test.beforeEach(t => {

    t.context.countries = [
        { name: 'Russian Federation' },
        { name: 'United Kingdom' },
        { name: 'The Netherlands' }
    ];

});

test('Should be able to custom sort on primitives;', t => {
    t.deepEqual([1, 2, 3].sort(as([2, 1, 3])), [2, 1, 3]);
    t.deepEqual(['One', 'Two', 'Three'].sort(as(['Two', 'Three', 'One'])), ['Two', 'Three', 'One']);
});

test('Should be able to custom sort on nested objects;', t => {
    t.context.countries.sort(as({
        name: ['United Kingdom', 'The Netherlands', 'Russian Federation']
    }));
    t.deepEqual(t.context.countries, [
        { name: 'United Kingdom' },
        { name: 'The Netherlands' },
        { name: 'Russian Federation' }
    ]);
});
