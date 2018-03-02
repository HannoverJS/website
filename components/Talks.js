import React from 'react'
import Markdown from 'react-markdown'
import Button from './Button'
import Avatar from './Avatar'
import Link from './Link'
import FreeSlot from './FreeSlot'
import { colors, spacings } from './styles'

export default ({ talks = [], numSlots = 2 }) => {
  const slots = talks.map(
    ({
      title,
      description,
      speaker: { name, avatarUrl, occupation, socialName, socialUrl }
    }) => (
      <React.Fragment>
        <h3>{title}</h3>
        <div>
          <Avatar src={avatarUrl} alt={name} />
        </div>
        <React.Fragment>
          <h4>{name}</h4>
          <p>
            {occupation}
            <br />
            <Link href={socialUrl} gray>
              {socialName}
            </Link>
          </p>
          <style jsx>{`
            h4,
            p {
              margin: 0;
            }
          `}</style>
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
    <div className="root">
      {slots.map((slot, i) => (
        <div key={i} className={`slot ${slot.freeSlot && 'freeSlot'}`}>
          {slot.freeSlot ? slot.component : slot}
        </div>
      ))}
      <style jsx>{`
        .root {
          display: flex;
          padding: 0;
        }

        .slot {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: ${colors.yellow};
          color: ${colors.gray};
          padding: ${spacings.base};
        }

        .slot:last-child {
          border-top: 1px solid ${colors.gray};
        }

        .freeSlot {
          text-align: center;
          justify-content: center;
        }

        @media (max-width: 767px) {
          .root {
            flex-direction: column;
          }
        }

        @media (min-width: 787px) {
          .slot:last-child {
            border-top: 0;
            border-left: 1px solid ${colors.gray};
          }
        }
      `}</style>
    </div>
  )
}
