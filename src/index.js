import React from 'react'
import ReactDOM from 'react-dom'
import styled, { injectGlobal } from 'styled-components'
import { camelizeKeys } from 'humps'
import LazyLoad from 'react-lazy-load'
import backgroundImage from './images/background.jpg'
import Header from './components/Header'
import NextMeetup from './components/NextMeetup'
import Section from './components/Section'
import Talks from './components/Talks'
import Organizers from './components/Organizers'
import Community from './components/Community'
import Location from './components/Location'
import FadeIn from './components/FadeIn'
import Loading from './components/Loading'
import registerServiceWorker from './registerServiceWorker'

injectGlobal`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    margin: 0;
    background: #333;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 300;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 0;
    font-weight: 400;
  }

  h1 {
    font-size: 36px;
    line-height: 44px;
  }

  h2 {
    font-size: 22px;
  }

  h3 {
    font-size: 20px;
  }

  h4 {
    font-size: 18px;
  }

  h5 {
    font-size: 16px;
  }

  a {
    text-decoration: none;
  }

  strong {
    font-weight: 400;
  }
`

const Container = styled.div`
  min-height: 500px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
  background: url(${backgroundImage}) center top no-repeat;

  @media (max-width: 767px) {
    background-position: 75% 0%;
  }

  @media (min-width: 1200px) {
    width: 1200px;
  }
`

class App extends React.Component {
  state = {
    loading: true,
    nextMeetup: {},
    talks: [],
    organizers: []
  }

  async componentDidMount() {
    const [nextMeetup] = await this.fetchData('events')
    const talks = await this.fetchData('talks')
    const organizers = await this.fetchData('organizers')

    this.setState({
      nextMeetup,
      talks,
      organizers,
      loading: false
    })
  }

  async fetchData(endpoint, baseUrl = 'https://api.hannoverjs.de/') {
    const res = await fetch(`${baseUrl}${endpoint}`)
    return camelizeKeys(await res.json(), { deep: true })
  }

  render() {
    const { loading, nextMeetup, talks, organizers } = this.state

    return (
      <React.Fragment>
        <FadeIn>
          <Container>
            <Header />
            <Loading loading={loading}>
              <NextMeetup nextMeetup={nextMeetup} />
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
                <Community />
              </Section>
            </Loading>
          </Container>
        </FadeIn>
        {!loading && (
          <LazyLoad height={600}>
            <Location
              location={nextMeetup.venue}
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={null}
            />
          </LazyLoad>
        )}
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
