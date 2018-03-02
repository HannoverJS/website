import React from 'react'
import Avatar from './Avatar'
import Link from './Link'
import { spacings } from './styles'

export default ({ organizers }) => (
  <ul>
    {organizers.map(
      ({
        name,
        description,
        twitter: { profileImageUrlHttps, screenName }
      }) => (
        <li key={name}>
          <Avatar src={profileImageUrlHttps} alt={name} />
          <h5>{name}</h5>
          <Link href={`https://twitter.com/${screenName}`}>
            {`@${screenName}`}
          </Link>
          <p>{description}</p>
        </li>
      )
    )}
    <style jsx>{`
      ul {
        display: flex;
        list-style-type: none;
        padding: 0;
      }
      li {
        flex: 1;
        font-size: 14px;
      }
      h5 {
        margin: 0;
      }
      p {
        margin: 0;
        margin-top: 5px;
      }
      @media (max-width: 767px) {
        ul {
          flex-direction: column;
        }
        li {
          margin-bottom: ${spacings.base};
        }
      }
      @media (min-width: 768px) {
        li {
          padding: 0 ${spacings.small};
        }
      }
    `}</style>
  </ul>
)
