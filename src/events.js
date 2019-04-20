const { camelizeKeys } = require('humps')
const fetch = require('./fetch')

const MEETUP_EVENTS =
  'https://api.meetup.com/hannoverjs/events?page=3&status=upcoming'

const { MEETUP_TOKEN } = process.env

if (!MEETUP_TOKEN) {
  throw new TypeError(
    `Expected 'process.env.MEETUP_TOKEN' to be set, got ${MEETUP_TOKEN}`
  )
}

function events() {
    return fetch(MEETUP_EVENTS, {
        Authorization: `Bearer ${MEETUP_TOKEN}`
    }).then(meetupEvents => {
        return meetupEvents.map(event => {
            let {
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

            return {
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
            }
        })
    })
}

module.exports = events
