import React from 'react'

export default props => (
  <React.Fragment>
    <img {...props} />
    <style jsx>{`
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    `}</style>
  </React.Fragment>
)
