import React, { createElement } from 'react'
import Section from '../Section'
import Link from '../Link'
import TwitterIcon from 'react-icons/lib/fa/twitter'
import FacebookIcon from 'react-icons/lib/fa/facebook'
import SlackIcon from 'react-icons/lib/fa/slack'
import styles from './styles.css'

const platforms = [
  {
    title: 'HannoverJS on Twitter',
    icon: TwitterIcon,
    url: 'https://twitter.com/hannoverjs'
  },
  {
    title: 'HannoverJS on Facebook',
    icon: FacebookIcon,
    url: 'https://www.facebook.com/hannoverjs'
  },
  {
    title: 'HannoverJS on Slack',
    icon: SlackIcon,
    url: 'http://slack.hannoverjs.de'
  }
]

export default function JoinUs() {
  const renderPlatforms = () => platforms.map((platform, i) => {
    const { title, icon, url } = platform
    return (
      <li className={styles.platform} key={i}>
        <Link className={styles.link} href={url} title={title}>
          {createElement(icon)}
        </Link>
      </li>
    )
  })

  return (
    <Section contentClassName={styles.platforms} title="Join the Community">
      {renderPlatforms()}
    </Section>
  )
}
