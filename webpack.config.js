const path = require('path');

module.exports = {
  entry: './static/js/app.tsx',
  mode: "development",
  devtool: 'inline-source-map',
  // stats: 'verbose',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      { 
        enforce: "pre", 
        test: /\.js$/, 
        loader: "source-map-loader"
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader', options: {
            sourceMap: true
          }
        }, {
          loader: 'less-loader', options: {
            sourceMap: true
          }
        }]
      }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.less' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/build/')
  }
};