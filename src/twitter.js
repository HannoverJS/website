const fetch = require('./fetch')

const { TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET } = process.env

const BASE_URL = 'https://api.twitter.com'

let accessToken = null

async function twitter(endpoint) {
    if (!accessToken) {
        let res = JSON.parse(
            await fetch(`${BASE_URL}/oauth2/token`, {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${Buffer.from(
                        `${TWITTER_CONSUMER_KEY}:${TWITTER_CONSUMER_SECRET}`
                    ).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: 'grant_type=client_credentials',
                json: false
            })
        )

        accessToken = res.access_token
    }

    return fetch(`${BASE_URL}/1.1/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

module.exports = twitter
