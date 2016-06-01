import React, { PropTypes } from 'react'
import Link from '../Link'

export default function TwitterLink({ handle }) {
  return (
    <Link target="_blank" href={`http://twitter.com/${handle}`} title={`${handle} on Twitter`}>
      {`@${handle}`}
    </Link>
  )
}

TwitterLink.propTypes = {
  handle: PropTypes.string.isRequired,
  name: PropTypes.string
}
