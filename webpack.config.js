const webpack = require('webpack');

module.exports = {
    entry: './src/set-order.js',
    output: {
        filename: 'dist/set-order.js',
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
