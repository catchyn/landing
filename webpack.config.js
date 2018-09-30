var path = require('path');

module.exports = {
    devtool: 'source-map',
    mode: 'production',
    entry: ['babel-polyfill', './static/js/app.tsx'],
    module: {
        rules: [{
            test: /.tsx?$/,
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