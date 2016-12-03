import React, { Component } from 'react'
import Header from '../Header'
import Container from '../Container'
import Talks from '../Talks'
import LoadingSpinner from '../LoadingSpinner'
import Section from '../Section'
import Team from '../Team'
import JoinUs from '../JoinUs'
import { description } from '../../../config'
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
          text={description}
        />
        <Team />
        <JoinUs />
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
