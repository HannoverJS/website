import React from 'react'
import styled from 'styled-components'
import Avatar from './Avatar'
import Link from './Link'
import { spacings } from '../styles'

const List = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const ListItem = styled.li`
  flex: 1;
  font-size: 14px;

  @media (max-width: 767px) {
    margin-bottom: ${spacings.base};
  }
  @media (min-width: 768px) {
    padding: 0 ${spacings.small};
  }
`

const Name = styled.h5`
  margin: 0;
`

const Description = styled.p`
  margin: 0;
  margin-top: 5px;
`

export default ({ organizers }) => (
  <List>
    {organizers.map(
      ({
        name,
        description,
        twitter: { profileImageUrlHttps, screenName }
      }) => (
        <ListItem key={name}>
          <Avatar src={profileImageUrlHttps} alt={name} />
          <Name>{name}</Name>
          <Link href={`https://twitter.com/${screenName}`}>
            {`@${screenName}`}
          </Link>
          <Description>{description}</Description>
        </ListItem>
      )
    )}
  </List>
)
