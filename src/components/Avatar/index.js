import React, { PropTypes } from 'react'
import styles from './styles.css'

export default function Avatar({ src, alt, className }) {
  return <img className={`${styles.avatar} ${className}`} src={src} alt={alt} />
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
}
