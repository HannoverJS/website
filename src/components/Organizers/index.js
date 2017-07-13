import React from 'react'
import Section from '../Section'
import Avatar from '../Avatar'
import TwitterLink from '../TwitterLink'
import styles from './styles.css'
import { api } from '../../../config'

function getTwitterProfileImage(screenName) {
  return `https://twitter.com/${screenName.slice(1)}/profile_image?size=original`
}

export default class Organizers extends React.Component {
  state = {
    loading: true,
    organizers: []
  }

  componentDidMount() {
    fetch(`${api.baseUrl}/organizers`)
      .then(res => res.json())
      .then(organizers => {
        this.setState({ loading: false, organizers }, this.props.onLoaded)
      })
  }

  renderOrganizers() {
    return this.state.organizers.map((organizer, i) => {
      const { name, job, company, twitter } = organizer

      return (
        <li className={styles.organizer} key={i}>
          <Avatar src={getTwitterProfileImage(twitter)} alt={name} />
          <div className={styles.name}>
            {name}
          </div>
          <div>
            {job}
          </div>
          <div>
            at {company}
          </div>
          <TwitterLink handle={twitter} name={name} />
        </li>
      )
    })
  }

  render() {
    if (this.state.loading) {
      return null
    }

    return (
      <Section title="The Organizers">
        {this.renderOrganizers()}
      </Section>
    )
  }
}
