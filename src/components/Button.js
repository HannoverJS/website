import React from 'react'
import styled from 'styled-components'
import { colors } from '../styles'

const Link = styled.a`
  padding: 7px 11px;
  color: ${colors.gray};
  background: ${props => (props.inverted ? 'transparent' : colors.yellow)};
  border: 1px solid ${props => (props.inverted ? colors.gray : colors.yellow)};
  transition: all 0.25s ease;
  font-size: ${props => props.large && '20px'};

  &:hover,
  &:focus {
    color: ${colors.white};
    background: ${props => (props.inverted ? colors.gray : 'transparent')};
  }
`

export default props => <Link target="_blank" {...props} />
