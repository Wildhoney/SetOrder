import test from 'ava';
import as, { HEAD, TAIL } from '../src/exact-order';
import by from 'sort-by';

test.beforeEach(t => {

    t.context.singleCountries = [
        { name: 'United Kingdom' },
        { name: 'Russian Federation' },
        { name: 'Hong Kong' },
        { name: 'Brazil' },
        { name: 'The Netherlands' },
        { name: 'Zambia' },
        { name: 'Philippines' },
    ];

    t.context.multipleCountries = [
        { name: 'Russian Federation', leader: 'Vladimir Putin' },
        { name: 'United Kingdom', leader: 'Margaret Thatcher' },
        { name: 'United Kingdom', leader: 'Theresa May' },
        { name: 'United Kingdom', leader: 'Gordon Brown' }
    ];

});

test('Should be able to custom sort on primitives;', t => {
    t.deepEqual([1, 2, 3].sort(as([2, 1, 3])), [2, 1, 3]);
    t.deepEqual(['One', 'Two', 'Three'].sort(as(['Two', 'Three', 'One'])), ['Two', 'Three', 'One']);
});

test('Should be able to custom sort on primitives using natural sort;', t => {
    t.deepEqual([1, 3, 5, 2, 4].sort(as([3], (a, b) => a > b)), [3, 1, 2, 4, 5]);
    t.deepEqual([1, 3, 5, 2, 4].sort(as([3], (a, b) => a > b, HEAD)), [3, 1, 2, 4, 5]);
    t.deepEqual([1, 3, 5, 2, 4].sort(as([3], (a, b) => a > b, TAIL)), [1, 2, 4, 5, 3]);
});

test('Should be able to custom sort on nested objects;', t => {

    t.context.singleCountries.sort(as({
        name: ['United Kingdom', 'The Netherlands', 'Russian Federation', 'Zambia', 'Hong Kong', 'Philippines', 'Brazil']
    }));

    t.deepEqual(t.context.singleCountries, [
        { name: 'United Kingdom' },
        { name: 'The Netherlands' },
        { name: 'Russian Federation' },
        { name: 'Zambia' },
        { name: 'Hong Kong' },
        { name: 'Philippines' },
        { name: 'Brazil' }
    ]);

});

test('Should be able to custom sort on nested objects using natural sort;', t => {

    t.context.singleCountries.sort(as({ name: ['United Kingdom', 'Hong Kong'] }, by('name')));

    t.deepEqual(t.context.singleCountries, [
        { name: 'United Kingdom' },
        { name: 'Hong Kong' },
        { name: 'Brazil' },
        { name: 'Philippines' },
        { name: 'Russian Federation' },
        { name: 'The Netherlands' },
        { name: 'Zambia' }
    ]);

    t.context.singleCountries.sort(as({ name: ['United Kingdom', 'Hong Kong'] }, by('name'), TAIL));

    t.deepEqual(t.context.singleCountries, [
        { name: 'Brazil' },
        { name: 'Philippines' },
        { name: 'Russian Federation' },
        { name: 'The Netherlands' },
        { name: 'Zambia' },
        { name: 'United Kingdom' },
        { name: 'Hong Kong' }
    ]);

});

test('Should be able to custom sort on nested objects with multiple properties;', t => {

    t.context.multipleCountries.sort(as({
        name: ['Russian Federation', 'United Kingdom'],
        leader: ['Theresa May', 'Gordon Brown', 'Margaret Thatcher']
    }));

    t.deepEqual(t.context.multipleCountries, [
        { name: 'Russian Federation', leader: 'Vladimir Putin' },
        { name: 'United Kingdom', leader: 'Theresa May' },
        { name: 'United Kingdom', leader: 'Gordon Brown' },
        { name: 'United Kingdom', leader: 'Margaret Thatcher' }
    ]);

});

test('Should be able to custom sort on nested objects with multiple properties using natural sort;', t => {

    t.context.multipleCountries.sort(as({
        name: ['United Kingdom'],
        leader: ['Margaret Thatcher']
    }, by('name', 'leader')));

    t.deepEqual(t.context.multipleCountries, [
        { name: 'United Kingdom', leader: 'Margaret Thatcher' },
        { name: 'United Kingdom', leader: 'Gordon Brown' },
        { name: 'United Kingdom', leader: 'Theresa May' },
        { name: 'Russian Federation', leader: 'Vladimir Putin' }
    ]);

});
