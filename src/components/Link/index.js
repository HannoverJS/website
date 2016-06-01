import React, { PropTypes } from 'react'
import styles from './styles.css'

export default function Link({ href, title, className, children, gray }) {
  const isGray = gray ? { color: '#333' } : null
  return (
    <a className={`${styles.link} ${className}`} style={isGray} href={href} title={title}>
        {children}
    </a>
  )
}

Link.propTypes = {
  gray: PropTypes.bool,
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  className: PropTypes.string
}

Link.defaultProps = {
  gray: false
}
