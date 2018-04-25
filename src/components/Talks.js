import React from 'react'
import Markdown from 'react-markdown'
import styled from 'styled-components'
import Avatar from './Avatar'
import Link from './Link'
import FreeSlot from './FreeSlot'
import { colors, spacings } from '../styles'

const Container = styled.div`
  display: flex;
  padding: 0;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const Slot = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${colors.yellow};
  color: ${colors.gray};
  padding: ${spacings.base};
  text-align: ${props => props.freeSlot && 'center'};
  justify-content: ${props => props.freeSlot && 'center'};
  align-items: center;

  &:last-child {
    border-top: 1px solid ${colors.gray};
  }

  @media (min-width: 787px) {
    &:last-child {
      border-top: 0;
      border-left: 1px solid ${colors.gray};
    }
  }
`

const SpeakerName = styled.h4`
  margin: 0;
`

const SpeakerDetails = styled.p`
  margin: 0;
`

export default ({ talks = [], numSlots = 2 }) => {
  const slots = talks.map(
    ({
      title,
      description,
      speaker: { name, avatarUrl, occupation, socialName, socialUrl }
    }) => (
      <React.Fragment>
        <h3>{title}</h3>
        <Avatar src={avatarUrl} alt={name} />
        <React.Fragment>
          <SpeakerName>{name}</SpeakerName>
          <SpeakerDetails>
            {occupation}
            <br />
            <Link href={socialUrl} gray>
              {socialName}
            </Link>
          </SpeakerDetails>
        </React.Fragment>
        <Markdown
          source={description}
          renderers={{
            link: ({ children, ...props }) => (
              <Link {...props} gray>
                {children}
              </Link>
            ),
            list: ({ children, ...props }) => (
              <ul>
                {children}
                <style jsx>{`
                  ul {
                    text-align: left;
                    margin: 0 auto;
                    width: 55%;
                  }
                `}</style>
              </ul>
            )
          }}
        />
      </React.Fragment>
    )
  )

  if (slots.length < numSlots) {
    for (let x = slots.length; x < numSlots; x++) {
      slots.push({ freeSlot: true, component: <FreeSlot /> })
    }
  }

  return (
    <Container>
      {slots.map((slot, i) => (
        <Slot key={i} freeSlot={slot.freeSlot}>
          {slot.freeSlot ? slot.component : slot}
        </Slot>
      ))}
    </Container>
  )
}
