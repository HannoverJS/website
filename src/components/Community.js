import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import TwitterLogo from './TwitterLogo'
import SlackLogo from './SlackLogo'

const List = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
  width: 300px;
`

const ListItem = styled.li`
  flex: 1;
`

export default () => (
  <List>
    <ListItem>
      <TwitterLogo />
      <h3>Twitter</h3>
      <Button href="https://twitter.com/hannoverjs">Follow us</Button>
    </ListItem>
    <ListItem>
      <SlackLogo />
      <h3>Slack</h3>
      <Button href="https://slack.hannoverjs.de">Join us</Button>
    </ListItem>
  </List>
)
