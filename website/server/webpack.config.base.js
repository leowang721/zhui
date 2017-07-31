const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../client/src'),
  entry: [
    './index.js'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../client/dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1}},
          'postcss-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg|jpe?g|png|gif|ico|woff2?)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    alias: {
      zhui: path.resolve(__dirname, '../../lib')
    }
  }
}
