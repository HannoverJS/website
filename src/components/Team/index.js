import React from 'react'
import Section from '../Section'
import Avatar from '../Avatar'
import TwitterLink from '../TwitterLink'
import styles from './styles.css'

const team = [
  {
    avatar: 'https://pbs.twimg.com/profile_images/657317643515490304/DDwp-N7D_400x400.jpg',
    name: 'Christoph Burgdorf',
    job: 'Trainer',
    company: 'thoughtram',
    twitter: 'cburgdorf'
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/740876520437211136/tpm5d6Ya_400x400.jpg',
    name: 'Pascal Precht',
    job: 'Trainer',
    company: 'thoughtram',
    twitter: 'PascalPrecht'
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/605066996850507776/PiUgd6zK_400x400.jpg',
    name: 'Jan-Oliver Pantel',
    job: 'Sr. Software Engineer',
    company: 'NewStore Inc.',
    twitter: 'JanPantel'
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/640230245468098560/AWsMiFL9_400x400.jpg',
    name: 'Robin Thrift',
    job: 'Software Engineer',
    company: 'NewStore Inc.',
    twitter: 'RobinThrift'
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/701526291103748098/0bYO7Xq0_400x400.png',
    name: 'Tim Cheung',
    job: 'Software Engineer',
    company: 'NewStore Inc.',
    twitter: 'timche_'
  }
]

export default function Team() {
  const renderMembers = () => team.map((member, i) => {
    const { avatar, name, job, company, twitter } = member

    return (
      <li className={styles.member} key={i}>
        <Avatar src={avatar} alt={name} />
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
