import HtmlWebpackPlugin from 'html-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import {
  title,
  description,
  googleAnalytics,
  appMountId
} from '../config'


export default function getHtmlPlugins(production) {
  let minify = {}
  let hash = false

  if (production) {
    minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
    }
    hash = true
  }

  return [
    new FaviconsWebpackPlugin('./assets/hannover-js.png'),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'), // eslint-disable-line global-require
      appMountId,
      title,
      meta: {
        description
      },
      mobile: true,
      googleAnalytics,
      minify,
      hash
    })
  ]
}
