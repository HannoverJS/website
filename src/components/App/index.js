import React, { Component } from 'react'
import Header from '../Header'
import Container from '../Container'
import Talks from '../Talks'
import LoadingSpinner from '../LoadingSpinner'
import Section from '../Section'
import Organizers from '../Organizers'
import JoinUs from '../JoinUs'
import { description } from '../../../config'
import './styles.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headerLoaded: false,
      talksLoaded: false,
      organizersLoaded: false
    }
  }

  renderContent() {
    return (
      <div>

      </div>
    )
  }

  render() {
    const { headerLoaded, talksLoaded, organizersLoaded } = this.state

    const loaded = !headerLoaded && !talksLoaded && !organizersLoaded

    return (
      <Container>
        <Header onLoaded={() => this.setState({ headerLoaded: true })} />
        {loaded && <LoadingSpinner />}
        <Talks onLoaded={() => this.setState({ talksLoaded: true })} />
        {!loaded
          ? (
            <Section
              title="What is this all about?"
              text={description}
            />
          )
          : null
        }
        <Organizers onLoaded={() => this.setState({ organizersLoaded: true })} />
        {!loaded
          ? <JoinUs />
          : null
        }
      </Container>
    )
  }
}
