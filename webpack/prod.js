import webpack from 'webpack'
import baseConfig from './base'
import getHtmlPlugins from './getHtmlPlugins'

export default {
  ...baseConfig,
  dev: 'source-map',
  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&minimize&&importLoaders=1&localIdentName=[hash:base64:5]',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            screw_ie8: true, // React doesn't support IE8
            warnings: false
        },
        mangle: {
            screw_ie8: true
        },
        output: {
            comments: false,
            screw_ie8: true
        }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    ...getHtmlPlugins(true)
  ]
}
