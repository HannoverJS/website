const fetch = require('./fetch')

const TWITTER_API_BASE_URL = 'https://api.twitter.com'

async function twitter(endpoint) {
  const { access_token } = JSON.parse(
    await fetch(`${TWITTER_API_BASE_URL}/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.TWITTER_CONSUMER_KEY}:${
            process.env.TWITTER_CONSUMER_SECRET
          }`
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: 'grant_type=client_credentials',
      json: false
    })
  )

  return fetch(`${TWITTER_API_BASE_URL}/1.1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
}

module.exports = twitter
