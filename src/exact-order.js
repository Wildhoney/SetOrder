import path from 'object-path';
import Symbol from 'es6-symbol';

/**
 * @constant HEAD
 * @type {Symbol}
 */
export const HEAD = Symbol('set-order/head');

/**
 * @constant TAIL
 * @type {Symbol}
 */
export const TAIL = Symbol('set-order/tail');

/**
 * @method handle
 * @param {*} a
 * @param {*} b
 * @return {Function}
 */
const handle = (a, b) => {

    /**
     * @param {Function} indexOf
     * @param {Function} sort
     * @param {Symbol} position
     * @return {Number|Boolean}
     */
    return (indexOf, sort, position) => {

        const [firstIndex, secondIndex] = [indexOf(a), indexOf(b)];

        if (firstIndex !== -1 && secondIndex === -1) return position === HEAD ? -1 : 1;
        if (firstIndex === -1 && secondIndex !== -1) return position === HEAD ? 1 : -1;
        if (firstIndex === -1 && secondIndex === -1) return sort(a, b);

        return firstIndex > secondIndex;

    };

};

/**
 * @method byPrimitive
 * @param {Array} order
 * @param {Function} sort
 * @param {Symbol} position
 * @return {Function}
 */
const byPrimitive = (order, sort, position) => (a, b) => {
    const indexOf = x => order.indexOf(x);
    return handle(a, b)(indexOf, sort, position);
};

/**
 * @method byNested
 * @param {Object} order
 * @param {Function} sort
 * @param {Symbol} position
 * @return {Function}
 */
const byNested = (order, sort, position) => {

    const keys = Object.keys(order);

    return function recurse(a, b, index = 0) {

        const key = keys[index];
        const indexOf = x => order[key].findIndex(y => y === path.get(x, key));
        const shouldRecurse = indexOf(a) === indexOf(b) && keys[index + 1];

        return shouldRecurse ? recurse(a, b, index + 1) : handle(a, b)(indexOf, sort, position);

    };

};

/**
 * @param {Array|Object} order
 * @param {Function} [sort = () => {}]
 * @param {Symbol} [position = HEAD]
 * @return {Function}
 */
export default (order, sort = () => {}, position = HEAD) => {
    return Array.isArray(order) ? byPrimitive(order, sort, position) : byNested(order, sort, position);
};
