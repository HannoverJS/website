import React, { Component, PropTypes } from 'react'
import Markdown from 'react-markdown'
import Section from '../Section'
import Avatar from '../Avatar'
import Button from '../Button'
import Link from '../Link'
import TwitterLink from '../TwitterLink'
import { api } from '../../../config'
import styles from './styles.css'

export default class Talks extends Component {
  static propTypes = {
    onLoaded: PropTypes.func
  };

  static defaultProps ={
    onLoaded: () => null
  };

  constructor(props) {
    super(props)
    this.state = {
      talks: [],
      loading: true,
      error: false
    }
  }

  componentDidMount() {
    fetch(`${api.baseUrl}/talks`)
      .then(res => res.json())
      .then(talks => {
        this.setState({ talks: talks.slice(0, 2), loading: false }, this.props.onLoaded)
      })
      .catch((e) => {
        console.log(e) // eslint-disable-line no-console
        this.setState({ loading: false, error: true }, this.props.onLoaded)
      })
  }

  renderFreeSlot(key) {
    return (
      <li className={`${styles.talk} ${styles.freeSlot}`} key={key}>
        <h3 className={styles.title}>
          Free Slot
        </h3>
        <p className={styles.description}>
          This slot could be yours!
        </p>
        <Button href="https://github.com/HannoverJS/talks#submitting-a-talk" secondary>
          Submit a Talk
        </Button>
        <p className={styles.note}>
          Do you need a talk idea?<br />
          We got you covered,{' '}
          <Link href="https://github.com/HannoverJS/talks#submitting-a-talk" title="Submit a Talk" gray>
            click me
          </Link>
          !
        </p>
      </li>
    )
  }

  renderTalks() {
    const talks = this.state.talks.map((talk, i) => {
      const {
        title,
        description,
        speaker: {
          name,
          avatar_url: avatarUrl,
          occupation,
          twitter,
          twitter_url: twitterUrl
        }
      } = talk
      return (
        <li className={styles.talk} key={i}>
          <h3 className={styles.title}>
            {title}
          </h3>
          <Avatar className={styles.avatar} src={avatarUrl} alt={name} />
          <p className={styles.speaker}>
            <span className={styles.name}>
              {name}
            </span>
            <br />
            {occupation}
            <br />
            <TwitterLink handle={twitter} gray />
          </p>
          <p className={styles.description}>
            {description}
          </p>
        </li>
      )
    })

    if (talks.length !== 2) {
      const freeSlots = 2 - talks.length
      for (let i = 0; i < freeSlots; i++) {
        talks.push(this.renderFreeSlot(talks.length + 1))
      }
    }

    return talks
  }

  render() {
    if (this.state.loading) {
      return null
    }

    return (
      <Section
        contentClassName={styles.content}
        title="The Talks"
        text={this.state.error ? 'Error while loading the talks ...' : null}
      >
        {!this.state.loading && !this.state.error && this.renderTalks()}
      </Section>
    )
  }
}
