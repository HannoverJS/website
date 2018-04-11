import React from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import { spacings } from '../styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Claim = styled.h1`
  text-align: center;
`

const LogoContainer = styled.div`
  @media (max-width: 767px) {
    margin-bottom: ${spacings.base};
  }

  @media (min-width: 768px) {
    align-self: flex-start;
  }
`

export default () => (
  <Container>
    <LogoContainer>
      <Logo />
    </LogoContainer>
    <Claim>
      Hannover's Monthly
      <br />
      JavaScript Meetup
    </Claim>
  </Container>
)
