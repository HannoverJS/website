const { camelizeKeys } = require("humps")
const fetch = require("./fetch")

const MEETUP_EVENTS =
    "https://api.meetup.com/hannoverjs/events?page=3&status=upcoming"

function events() {
    // return fetch(MEETUP_EVENTS).then(meetupEvents => {
    //     return meetupEvents.map(event => {
    //         let {
    //             time,
    //             updated,
    //             venue: {
    //                 name,
    //                 lat,
    //                 lon,
    //                 address_1: street,
    //                 city,
    //                 country,
    //                 localizedCountryName
    //             },
    //             link: meetupUrl,
    //             howToFindUs
    //         } = camelizeKeys(event)

    //         return {
    //             date: new Date(time),
    //             updatedAt: new Date(updated),
    //             meetupUrl,
    //             venue: {
    //                 name,
    //                 lat,
    //                 lon,
    //                 street,
    //                 city,
    //                 country,
    //                 localizedCountryName,
    //                 howToFindUs
    //             }
    //         }
    //     })
    // })
    return [{ date: new Date("March 27, 2020") }]
}

module.exports = events
