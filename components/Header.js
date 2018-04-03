import React from 'react'
import Logo from './Logo'
import Button from './Button'
import Underline from './Underline'
import { spacings } from './styles'

export default ({
  nextMeetup: { date, meetupUrl = 'https://meetup.com/Hannover-Gophers/' } = {}
}) => (
  <div className="root">
    <div className="logo">
      <Logo />
    </div>
    <h1 className="claim">
      Hannover's Monthly
      <br />
      Golang Meetup
    </h1>
    {Boolean(date) && (
      <h2>
        Next Meetup on{' '}
        <Underline>
          {new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
          })}
        </Underline>
      </h2>
    )}
    <Button href={meetupUrl} large>
      RSVP & Join us on Meetup
    </Button>
    <style jsx>{`
      .root {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 64px;
      }

      .claim {
        text-align: center;
      }

      h2 {
        margin-bottom: 12px;
      }

      @media (max-width: 767px) {
        .logo {
          margin-bottom: ${spacings.base};
        }
      }

      @media (min-width: 768px) {
        .logo {
          align-self: flex-start;
        }
      }
    `}</style>
  </div>
)
