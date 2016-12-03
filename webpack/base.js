import path from 'path'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import postcssImportUrl from 'postcss-import-url'
import postcssCustomProperties from 'postcss-custom-properties'

export default {
  entry: [
    'whatwg-fetch',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.jpg$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  postcss: [
    autoprefixer,
    postcssImport,
    postcssImportUrl,
    postcssCustomProperties
  ]
}
