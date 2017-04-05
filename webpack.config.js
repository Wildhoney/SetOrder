const webpack = require('webpack');

module.exports = {
    entry: './src/exact-order.js',
    output: {
        filename: '[name].js',
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
