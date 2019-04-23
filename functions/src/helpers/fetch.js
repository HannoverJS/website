const got = require('got')

const USER_AGENT = 'https://github.com/hannoverjs/hannoverjs-api'

async function fetch(url, opts) {
  const gotOpts = Object.assign({ json: true }, opts)

  gotOpts.headers = Object.assign(
    {
      'User-Agent': USER_AGENT
    },
    gotOpts.headers
  )

  const { body } = await got(url, gotOpts)

  return body
}

module.exports = fetch
