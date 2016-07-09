import React, { PropTypes } from 'react'
import styles from './styles.css'

export default function Button({ href, secondary, large, className, children }) {
  return (
    <a
      className={
        `${styles.button} ${secondary && styles.secondary || ''}` +
        `${large && styles.large || ''} ${className || ''}`
      }
      href={href}
    >
      {children}
    </a>
  )
}

Button.propTypes = {
  href: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
  large: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.string.isRequired
}

Button.defaultProps = {
  secondary: false,
  large: false
}
