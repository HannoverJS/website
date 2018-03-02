import React from 'react'
import Underline from './Underline'
import { spacings } from './styles'

export default ({ title, text, children, marginBottom = true }) => (
  <div>
    <h2>
      <Underline>{title}</Underline>
    </h2>
    {children || <p>{text}</p>}
    <style jsx>{`
      div {
        text-align: center;
        margin-bottom: ${marginBottom && spacings.base};
      }
      p {
        max-width: 750px;
        margin: 0 auto;
        font-size: 18px;
      }
    `}</style>
  </div>
)
