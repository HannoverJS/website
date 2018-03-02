import React from 'react'
import { colors } from './styles'

export default ({ children, inverted, large, className, ...props }) => (
  <a
    className={`${large && 'large'} ${inverted && 'inverted'} ${className}`}
    target="_blank"
    {...props}
  >
    {children}
    <style jsx>{`
      a {
        padding: 7px 11px;
        color: ${colors.gray};
        background: ${colors.yellow};
        border: 1px solid ${colors.yellow};
        transition: all 0.25s ease;
      }

      a:hover,
      a:focus {
        color: ${colors.white};
        background: transparent;
      }

      .inverted {
        background: transparent;
        border-color: ${colors.gray};
      }

      .inverted:hover,
      .inverted:focus {
        color: ${colors.white};
        background: ${colors.gray};
      }

      .large {
        font-size: 20px;
      }
    `}</style>
  </a>
)
