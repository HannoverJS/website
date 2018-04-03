import React from 'react'
import fetch from 'node-fetch'
import camelcaseKeys from 'camelcase-keys'
import Head from '../components/Head'
import Header from '../components/Header'
import Section from '../components/Section'
import Talks from '../components/Talks'
import Organizers from '../components/Organizers'
import Community from '../components/Community'
import Location from '../components/Location'

const fetchData = async (
  endpoint,
  baseUrl = 'https://hannovergophers-api-vdpbkgocjt.now.sh/'
) => {
  const res = await fetch(`${baseUrl}${endpoint}`)
  return camelcaseKeys(await res.json(), { deep: true })
}

const Index = ({ nextMeetup, talks, organizers, slack, venue }) => (
  <React.Fragment>
    <div>
      <Head />
      <Header nextMeetup={nextMeetup} />
      <Section title="The Talks">
        <Talks talks={talks} />
      </Section>
      <Section
        title="What Is This All About?"
        text="Hannover Gophers is a usergroup focused on Golang and related topics. The idea has gained great interest around Lower-Saxony's Golang folks. We meet regularly every month at 6.30pm at NewStore, Bödekerstraße 56 in Hannover. Find the next date on our meetup page."
      />
      <Section title="Who Is Behind This?">
        <Organizers organizers={organizers} />
      </Section>
      <Section title="Interact with Us">
        <Community slack={slack} />
      </Section>
      <style jsx>{`
        div {
          margin-left: auto;
          margin-right: auto;
          padding: 0 20px;
          background: url(/static/backgroundC1.jpg) center top no-repeat;
        }

        @media (max-width: 767px) {
          div {
            background-position: 75% 0%;
          }
        }

        @media (min-width: 1200px) {
          div {
            width: 1200px;
          }
        }
      `}</style>
    </div>
    <Location
      // remove later...
      location={venue} //{nextMeetup.venue}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={null}
    />
  </React.Fragment>
)

Index.getInitialProps = async () => {
  const [nextMeetup] = await fetchData('events')
  const talks = await fetchData('talks')
  const organizers = await fetchData('organizers')
  const slack = await fetchData('data', 'https://slack.hannoverjs.de/')
  // remove later...
  const venue = {
    name: 'Hannover Gophers',
    lat: 52.3844108581543,
    lon: 9.753049850463867,
    city: 'Hannover',
    country: 'de',
    localized_country_name: 'Germany',
    how_to_find_us:
      'Ring the bell "HannoverJS", you can find us on the 2nd floor.'
  }

  return {
    nextMeetup,
    talks,
    organizers,
    slack,
    // remove later...
    venue
  }
}

export default Index
