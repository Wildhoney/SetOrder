import path from 'object-path';

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

    return (a, b) => {
        const key = keys[0];
        const [firstIndex, secondIndex] = [order[key].findIndex(c => c === a[key]), order[key].findIndex(c => c === b[key])];
        return firstIndex > secondIndex;
    };

};

/**
 * @param {Array|Object} order
 * @return {Function}
 */
export default order => {
    return Array.isArray(order) ? byPrimitive(order) : byNested(order);
};
