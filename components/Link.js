import React from 'react'
import { colors } from './styles'

export default ({ children, gray, ...props }) => (
  <a target="_blank" {...props}>
    {children}
    <style jsx>{`
      a {
        color: ${gray ? colors.gray : colors.yellow};
        text-decoration: ${gray && 'underline'};
      }
    `}</style>
  </a>
)
