import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/exact-order.js',
    dest: 'dist/exact-order.js',
    format: 'cjs',
    plugins: [
        resolve({
            jsnext: true,
            module: true,
            main: true
        })
    ]
};
