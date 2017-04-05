import path    from 'object-path';
import Bicycle from 'bi-cycle';

/**
 * @method head
 * @param {*} value
 * @param {String} [property]
 * @return {Object}
 */
export const head = (value, property) => ({ value, property, position: head });

/**
 * @method tail
 * @param {*} value
 * @param {String} [property]
 * @return {Object}
 */
export const tail = (value, property) => ({ value, property, position: tail });

/**
 * @method isHead
 * @param {Object} x
 * @return {Boolean}
 */
const isHead = x => x.position === head || !x.position;

/**
 * @method isTail
 * @param {Object} x
 * @return {Boolean}
 */
const isTail = x => x.position === tail;

/**
 * @method transform
 * @param {*} x
 * @return {Object}
 */
const transform = x => 'value' in Object(x) ? x : { value: x };

/**
 * @method indexify
 * @param {Function} fn
 * @return {Function}
 */
const indexify = fn => (xss, x) => [...xss, { ...x, index: fn() }];

/**
 * @method findIndexIn
 * @param {Array} sequence
 * @return {Function}
 */
const findIndexIn = sequence => x => (sequence.find(y => y.value === path.get(x, y.property)) || { index: -1 }).index;

/**
 * @method exact
 * @param {Array} order
 * @param {Function} [sort = () => 0]
 * @return {Function}
 */
export const exact = (order, sort = () => 0) => {

    const { previous } = Bicycle({ start: -1 });
    const { next }     = Bicycle({ start: 0 });
    const findIndex    = findIndexIn([
        ...order.map(transform).filter(isHead).reverse().reduce(indexify(previous), []),
        ...order.map(transform).filter(isTail).reduce(indexify(next), [])
    ]);

    return (a, b) => {
        const [firstIndex, secondIndex] = [findIndex(a), findIndex(b)];
        return firstIndex === -1 && secondIndex === -1 ? sort(a, b) : firstIndex - secondIndex;
    };

};
