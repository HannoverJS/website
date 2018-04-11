import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Underline from './Underline'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 64px;
`

const NextMeetup = styled.h2`
  margin-bottom: 12px;
`

export default ({
  nextMeetup: { date, meetupUrl = 'http://www.meetup.com/HannoverJS/' } = {}
}) => (
  <Container>
    {Boolean(date) && (
      <NextMeetup>
        Next Meetup on{' '}
        <Underline>
          {new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
          })}
        </Underline>
      </NextMeetup>
    )}
    <Button href={meetupUrl} large>
      RSVP & Join us on Meetup
    </Button>
  </Container>
)
