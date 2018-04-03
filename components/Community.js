import React from 'react'
import Button from './Button'
import TwitterLogo from './TwitterLogo'
import SlackLogo from './SlackLogo'

export default ({ slack }) => (
  <React.Fragment>
    <ul className="root">
      <li>
        <TwitterLogo />
        <h3>Twitter</h3>
        <Button href="https://twitter.com/HannoverGophers">Follow us</Button>
      </li>
      <li>
        <SlackLogo />
        <h3>Slack</h3>
        <Button href="https://hannover-gophers.slack.com">Join us</Button>
      </li>
      <style jsx>{`
        ul {
          display: flex;
          list-style-type: none;
          margin: 0 auto;
          padding: 0;
          width: 300px;
        }
        li {
          flex: 1;
        }
      `}</style>
    </ul>
  </React.Fragment>
)
