import React from 'react'
import Button from './Button'

export default () => (
  <React.Fragment>
    <h3>Free Slot</h3>
    <p>This slot could be yours!</p>
    <div>
      <Button
        href="https://github.com/HannoverGophers/talks#submitting-a-talk"
        inverted
      >
        Submit a Talk
      </Button>
    </div>
    <p>
      Need talk ideas?
      <br />
      We got you covered!
    </p>
    <div>
      <Button
        href="https://github.com/HannoverGophers/talks/issues?q=is%3Aissue+is%3Aopen+label%3A%22Talk+Idea%22"
        inverted
      >
        View Talk Ideas
      </Button>
    </div>
  </React.Fragment>
)
