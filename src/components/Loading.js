import React from 'react'
import styled, { keyframes } from 'styled-components'
import FadeIn from './FadeIn'
import { colors, spacings } from '../styles'

const moveAnimation = keyframes`
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  } 50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  } 50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  } 75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
  } 100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
`

const Spinner = styled.div`
  margin: ${spacings.base} auto;
  width: 40px;
  height: 40px;
  position: relative;
`

const SpinnerCube = styled.div`
  background-color: ${colors.yellow};
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;

  animation: ${moveAnimation} 1.8s infinite ease-in-out;
  animation-delay: ${props => props.second && '-0.9s'};
`

export default ({ loading, children }) =>
  loading ? (
    <div>
      <Spinner>
        <SpinnerCube />
        <SpinnerCube second />
      </Spinner>
    </div>
  ) : (
    <FadeIn>{children}</FadeIn>
  )
