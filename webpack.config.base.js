import path from 'path'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import postcssImportUrl from 'postcss-import-url'
import postcssCustomProperties from 'postcss-custom-properties'

export default {
  dev: 'cheap-module-source-map',
  context: path.join(__dirname, './src'),
  entry: {
    js: './index.js',
    html: './index.html'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
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
    extensions: ['', '.js']
  },
  postcss: [
    autoprefixer,
    postcssImport,
    postcssImportUrl,
    postcssCustomProperties
  ]
}
