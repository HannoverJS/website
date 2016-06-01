import React, { Component } from 'react'
import Header from '../Header'
import Container from '../Container'
import Talks from '../Talks'
import LoadingSpinner from '../LoadingSpinner'
import Section from '../Section'
import Team from '../Team'
import JoinUs from '../JoinUs'
import Footer from '../Footer'
import './styles.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  renderContent() {
    return (
      <div>
        <Section
          title="What is this all about?"
          text={
            'HannoverJS is a usergroup focused on JavaScript and related topcis. ' +
            'The idea has gained great interest around Lower-Saxony\'s JavaScript folks. ' +
            'We meet regularly on the 4th Thursday of every month at 7pm at NewStore, ' +
            'Bödekerstraße 56 in Hannover.'
          }
        />
        <Team />
        <JoinUs />
        <Footer />
      </div>
    )
  }

  render() {
    return (
      <Container>
        <Header />
        <Talks onLoaded={() => this.setState({ loading: false })} />
        {this.state.loading ? <LoadingSpinner /> : this.renderContent()}
      </Container>
    )
  }
}
