/* eslint-disable no-console */

import fs from 'fs-extra'
import path from 'path'

const staticPath = path.join(__dirname, '../static')
const distPath = path.join(__dirname, '../dist')

fs.copy(`${staticPath}/CNAME`, `${distPath}/CNAME`, err => {
  if (err) {
    console.error(err)
  } else {
    console.log('Copying CNAME to dist ...')
  }
})


fs.copy(`${staticPath}/favicons`, `${distPath}/assets`, err => {
  if (err) {
    console.error(err)
  } else {
    console.log('Copying favicons to dist/assets ...')
  }
})
