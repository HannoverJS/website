const { camelizeKeys, decamelizeKeys } = require('humps')
const fetch = require('./helpers/fetch')

const MEETUP_EVENTS_API =
  'https://api.meetup.com/hannoverjs/events?page=3&status=upcoming'

exports.handler = async (_event, _context, callback) => {
  const meetupEvents = await fetch(MEETUP_EVENTS_API, {
    Authorization: `Bearer ${process.env.MEETUP_TOKEN}`
  })

  const events = meetupEvents.map(event => {
    const {
      time,
      updated,
      venue: {
        name,
        lat,
        lon,
        address_1: street,
        city,
        country,
        localizedCountryName
      },
      link: meetupUrl,
      howToFindUs
    } = camelizeKeys(event)

    return decamelizeKeys({
      date: new Date(time),
      updatedAt: new Date(updated),
      meetupUrl,
      venue: {
        name,
        lat,
        lon,
        street,
        city,
        country,
        localizedCountryName,
        howToFindUs
      }
    })
  })

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(events)
  })
}
