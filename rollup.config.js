import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'src/exact-order.js',
    dest: 'dist/exact-order.js',
    format: 'cjs',
    plugins: [
        commonjs({
            namedExports: {
                'node_modules/object-path': ['default']
            }
        }),
        resolve({
            jsnext: true,
            module: true,
            main: true
        })
    ]
};
