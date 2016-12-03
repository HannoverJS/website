import webpack from 'webpack'
import baseConfig from './base'
import getHtmlPlugins from './getHtmlPlugins'

export default {
  ...baseConfig,
  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders,
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
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    }),
    new webpack.optimize.DedupePlugin(),
    ...getHtmlPlugins(true)
  ]
}
