var path = require('path');

module.exports = {
    devtool: 'source-map',
    mode: 'production',
    entry: ['babel-polyfill', './app/js/app.jsx'],
    //entry: ['./app/js/app.jsx'],
    module: {
        rules: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                presets: ['env', 'react']
            }
        }]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build/js')
    }
};