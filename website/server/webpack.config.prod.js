const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  },
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
}

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../client/index.html'),
        to: 'index.html'
      }
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
})
