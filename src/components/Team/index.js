import React from 'react'
import Section from '../Section'
import Avatar from '../Avatar'
import TwitterLink from '../TwitterLink'
import styles from './styles.css'

function getTwitterProfileImage(screenName) {
  return `https://twitter.com/${screenName}/profile_image?size=original`
}

const team = [
  {
    name: 'Christoph Burgdorf',
    job: 'Trainer',
    company: 'thoughtram',
    twitter: 'cburgdorf'
  },
  {
    name: 'Pascal Precht',
    job: 'Trainer',
    company: 'thoughtram',
    twitter: 'PascalPrecht'
  },
  {
    name: 'Jan-Oliver Pantel',
    job: 'Sr. Software Engineer',
    company: 'NewStore Inc.',
    twitter: 'JanPantel'
  },
  {
    name: 'Robin Thrift',
    job: 'Software Engineer',
    company: 'NewStore Inc.',
    twitter: 'RobinThrift'
  },
  {
    name: 'Tim Cheung',
    job: 'Software Engineer',
    company: 'NewStore Inc.',
    twitter: 'timche_'
  }
]

export default function Team() {
  const renderMembers = () => team.map((member, i) => {
    const { name, job, company, twitter } = member

    return (
      <li className={styles.member} key={i}>
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

  return (
    <Section title="The Team">
      {renderMembers()}
    </Section>
  )
}
