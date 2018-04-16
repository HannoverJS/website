import React from 'react'
import LazyLoad from 'react-lazy-load'
import styled from 'styled-components'

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`

export default props => (
  <LazyLoad width={100} height={100}>
    <Image {...props} />
  </LazyLoad>
)
