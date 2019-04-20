const twitter = require('./twitter')

async function fetchOrganizers(twitterUsernames) {
    let organizers = await twitter(
        `users/lookup.json?screen_name=${twitterUsernames.join(',')}`
    )

    /* eslint-disable camelcase */
    return organizers.map(
        ({
            name,
            description,
            profile_image_url,
            profile_image_url_https,
            screen_name
        }) => ({
            name,
            description,
            twitter: {
                profile_image_url: profile_image_url.replace('_normal', ''),
                profile_image_url_https: profile_image_url_https.replace('_normal', ''),
                screen_name
            }
        })
    )
}

module.exports = () =>
        fetchOrganizers([
            'RobinThrift',
            'ChrisIncoqnito'
        ])
