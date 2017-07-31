const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

const SERVER_HOST = 'localhost'
const WEBPACK_DEV_SERVER_PORT = 8848

const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'true'))
}

module.exports = merge(baseConfig, {
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    `webpack-hot-middleware/client?reload=true&path=http://${SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}/__webpack_hmr`,
    'webpack/hot/only-dev-server'
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'standard-loader',
        exclude: /node_modules/,
        options: {
          error: false,
          snazzy: true,
          parser: 'babel-eslint'
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // Enable HMR
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    hot: true, // Tell the dev-server we're using HMR
    port: WEBPACK_DEV_SERVER_PORT,
    historyApiFallback: true,
    // contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    stats: {
      colors: true
    }
  }
})
