import test from 'ava';
import as from '../src/exact-order';

test('Should be able to custom sort on primitives;', t => {
    t.deepEqual([1, 2, 3].sort(as([2, 1, 3])), [2, 1, 3]);
    t.deepEqual(['One', 'Two', 'Three'].sort(as(['Two', 'Three', 'One'])), ['Two', 'Three', 'One']);
});

test('Should be able to custom sort on nested objects;', t => {

    const countries = [
        { name: 'Russian Federation' },
        { name: 'United Kingdom' },
        { name: 'The Netherlands' }
    ];

    countries.sort(as({
        name: ['United Kingdom', 'The Netherlands', 'Russian Federation']
    }));

    t.deepEqual(countries, [
        { name: 'United Kingdom' },
        { name: 'The Netherlands' },
        { name: 'Russian Federation' }
    ]);

});

test('Should be able to custom sort on nested objects with multiple properties;', t => {

    const countries = [
        { name: 'Russian Federation', leader: 'Vladimir Putin' },
        { name: 'United Kingdom', leader: 'Margaret Thatcher' },
        { name: 'United Kingdom', leader: 'Gordon Brown' },
        { name: 'United Kingdom', leader: 'Theresa May' },
    ];

    countries.sort(as({
        name: ['Russian Federation', 'United Kingdom'],
        leader: ['Theresa May', 'Gordon Brown', 'Margaret Thatcher']
    }));

    t.deepEqual(countries, [
        { name: 'Russian Federation', leader: 'Vladimir Putin' },
        { name: 'United Kingdom', leader: 'Theresa May' },
        { name: 'United Kingdom', leader: 'Gordon Brown' },
        { name: 'United Kingdom', leader: 'Margaret Thatcher' }
    ]);

});
