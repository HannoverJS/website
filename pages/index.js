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

const fetchData = async (endpoint, baseUrl = 'https://api.hannoverjs.de/') => {
  const res = await fetch(`${baseUrl}${endpoint}`)
  return camelcaseKeys(await res.json(), { deep: true })
}

const Index = ({ nextMeetup, talks, organizers, slack }) => (
  <React.Fragment>
    <div>
      <Head />
      <Header nextMeetup={nextMeetup} />
      <Section title="The Talks">
        <Talks talks={talks} />
      </Section>
      <Section
        title="What Is This All About?"
        text="HannoverJS is a usergroup focused on JavaScript and related topics. The idea has gained great interest around Lower-Saxony's JavaScript folks. We meet regularly on the 4th Thursday of every month at 6.30pm at NewStore, Bödekerstraße 56 in Hannover."
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
          background: url(/static/background.jpg) center top no-repeat;
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
      location={nextMeetup.venue}
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

  return {
    nextMeetup,
    talks,
    organizers,
    slack
  }
}

export default Index
