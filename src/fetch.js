const got = require('got')

async function fetch(url, opts) {
    let gotOpts = Object.assign({ json: true }, opts)

    gotOpts.headers = Object.assign(
        {
            'User-Agent': 'https://github.com/hannoverjs/hannoverjs-website'
        },
        gotOpts.headers
    )

    let { body } = await got(url, gotOpts)

    return body
}

module.exports = fetch
