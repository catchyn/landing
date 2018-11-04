const path = require('path');

module.exports = {
  entry: './static/js/app.tsx',
  mode: "development",
  devtool: 'inline-source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000
  },
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
      },
      {
        test: /\.(png|jpg|gif)$/i,
        include: path.resolve(__dirname, "./static/img"),
        loader: 'url-loader'
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader'
      }]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.less' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/build/')
  },

  // How settings live reload or HMR
  // https://medium.com/code-oil/burning-questions-with-answers-to-why-webpack-dev-server-live-reload-does-not-work-6d6390277920
  devServer: {
    publicPath: '/build/',
    contentBase: path.resolve(__dirname, "static"),
    watchContentBase: true,
    open: true,
    port: 9000
  }
};