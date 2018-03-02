import React from 'react'
import { colors } from './styles'

export default ({ children }) => (
  <span>
    {children}
    <style jsx>{`
      span {
        padding-bottom: 2px;
        border-bottom: 1px solid ${colors.yellow};
      }
    `}</style>
  </span>
)
