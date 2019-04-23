const twitter = require('./helpers/twitter')

async function getOrganizers(twitterUsernames) {
  const organizers = await twitter(
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
    /* eslint-enable camelcase */
  )
}

exports.handler = async (_event, _context, callback) => {
  const organizers = await getOrganizers([
    'cburgdorf',
    'PascalPrecht',
    'JanPantel',
    'RobinThrift',
    'timche_',
    'maxrimue'
  ])

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(organizers)
  })
}
