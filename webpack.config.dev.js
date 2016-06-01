/* eslint-disable max-len */

import webpack from 'webpack'
import baseConfig from './webpack.config.base'

export default {
  ...baseConfig,
  entry: {
    ...baseConfig.entry
  },
  module: {
    ...baseConfig.module,
    loaders: [
      ...baseConfig.module.loaders,
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules&minimize&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    contentBase: './src',
    hot: true
  }
}
