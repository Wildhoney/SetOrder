import test from 'ava';
import as from '../src/exact-order';

test('Should be able to custom sort on primitives;', t => {
    t.deepEqual([1, 2, 3].sort(as([2, 1, 3])), [2, 1, 3]);
    t.deepEqual(['One', 'Two', 'Three'].sort(as(['Two', 'Three', 'One'])), ['Two', 'Three', 'One']);
});
