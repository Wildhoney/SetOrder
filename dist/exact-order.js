'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('object-path'));

/**
 * @method byPrimitive
 * @param {Array} order
 * @return {Function}
 */
const byPrimitive = order => (a, b) => {
    const [firstIndex, secondIndex] = [order.indexOf(a), order.indexOf(b)];
    return firstIndex > secondIndex;
};

/**
 * @method byNested
 * @param {Object} order
 * @return {Function}
 */
const byNested = order => {

    const keys = Object.keys(order);

    return function sort(a, b, index = 0) {

        const key = keys[index];

        const [firstIndex, secondIndex] = [
            order[key].findIndex(c => c === path.get(a, key)),
            order[key].findIndex(c => c === path.get(b, key))
        ];

        return firstIndex === secondIndex ? sort(a, b, index + 1) : firstIndex > secondIndex;

    };

};

/**
 * @param {Array|Object} order
 * @return {Function}
 */
var exactOrder = order => {
    return Array.isArray(order) ? byPrimitive(order) : byNested(order);
};

module.exports = exactOrder;
