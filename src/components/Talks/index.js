import React, { Component, PropTypes } from 'react'
import Markdown from 'react-markdown'
import Section from '../Section'
import Avatar from '../Avatar'
import Button from '../Button'
import Link from '../Link'
import api from '../../services/api'
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
    api('https://api.github.com/repos/HannoverJS/talks/issues?state=open&labels=Upcoming%20Talk')
      .then(res => {
        const talks = res
          .filter(talk => new Date(talk.milestone.dueOn).valueOf() > new Date().valueOf())
          .map(talk => {
            const { title, body, user: { login, avatarUrl } } = talk
            return {
              title,
              description: body,
              speaker: {
                name: login,
                avatar: avatarUrl
              }
            }
          })
        this.setState({ talks, loading: false })
        this.props.onLoaded()
      })
      .catch(() => {
        this.setState({ loading: false, error: true })
        this.props.onLoaded()
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
        <Button href="https://github.com/HannoverJS/talks#submit-a-talk" secondary>
          Submit a Talk
        </Button>
        <p className={styles.note}>
          Do you need a talk idea?<br />
          We got you covered,{' '}
          <Link href="https://github.com/HannoverJS/talks#hannoverjs-talks" gray>
            click me
          </Link>
          !
        </p>
      </li>
    )
  }

  renderTalks() {
    const talks = this.state.talks.map((talk, i) => {
      const { title, description, speaker: { name, avatar } } = talk
      return (
        <li className={styles.talk} key={i}>
          <h3 className={styles.title}>
            {title}
          </h3>
          <Avatar className={styles.avatar} src={avatar} alt={name} />
          <Markdown className={styles.description} source={description} />
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
        text={this.state.error && 'Error while loading the talks ...'}
      >
        {!this.state.loading && !this.state.error && this.renderTalks()}
      </Section>
    )
  }
}
