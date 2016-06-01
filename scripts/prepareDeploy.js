/* eslint-disable no-console */

import fs from 'fs-extra'
import path from 'path'

fs.copy(path.join(__dirname, '../CNAME'), path.join(__dirname, '../dist/CNAME'), (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('Copied CNAME to dist')
  }
})
