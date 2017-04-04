import path   from 'object-path';
import Symbol from 'es6-symbol';

/**
 * @constant head
 * @type {Symbol}
 */
export const head = Symbol('set-order/head');

/**
 * @constant tail
 * @type {Symbol}
 */
export const tail = Symbol('set-order/tail');

/**
 * @method exact
 * @param {Array} xs
 * @param {Array} order
 * @param {Function} [sort = () => 0]
 * @return {Array}
 */
export const exact = (xs, order, sort = () => 0) => {

    const sorted = xs.reduce((xss, x, index) => {

        const model = order.find(a => a.value === x);

        return [...xss, {
            has:   !!model,
            key:   (model || {}).key || null,
            index: model ? (model.position === tail ? (xs.length + index) : -(xs.length - index)) : index + 1,
            value: xs[index],
        }];

    }, []);

    return xs.sort((a, b) => {

        const [first, second] = [
            sorted.find(x => x.value === a),
            sorted.find(x => x.value === b),
        ];

        return !first.has && !second.has ? sort(a, b) : first.index - second.index;

    });

};
