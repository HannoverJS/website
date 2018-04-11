import styled from 'styled-components'

const FadeIn = styled.div`
  animation: fadein 0.5s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

export default FadeIn
