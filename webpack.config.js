const webpack = require('webpack');

module.exports = {
    entry: './src/exact-order.js',
    output: {
        filename: 'dist/exact-order.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/i
            }
        ]
    }
};
