import path from 'object-path';

/**
 * @param {Array} order
 * @return {Function}
 */
export default order => {

    return (a, b) => {

        const [firstIndex, secondIndex] = [order.indexOf(a), order.indexOf(b)];
        return firstIndex > secondIndex;

    };

};
