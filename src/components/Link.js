import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles'

const Link = styled.a`
  color: ${props => (props.gray ? colors.gray : colors.yellow)};
  text-decoration: ${props => props.gray && 'underline'};
`

export default props => <Link target="_blank" rel="noopener" {...props} />
