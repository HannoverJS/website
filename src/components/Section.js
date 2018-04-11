import React from 'react'
import styled from 'styled-components'
import Underline from './Underline'
import { spacings } from '../styles'

const Container = styled.div`
  text-align: center;
  margin-bottom: ${props => props.marginBottom && spacings.base};
`

const TextContent = styled.p`
  max-width: 750px;
  margin: 0 auto;
  font-size: 18px;
`

export default ({ title, text, children, marginBottom = true }) => (
  <Container marginBottom={marginBottom}>
    <h2>
      <Underline>{title}</Underline>
    </h2>
    {children || <TextContent>{text}</TextContent>}
  </Container>
)
