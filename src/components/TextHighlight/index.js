import React, { PropTypes } from 'react'
import styles from './styles.css'

export default function TextHighlight({ text }) {
  return <span className={styles.text}>{text}</span>
}

TextHighlight.propTypes = {
  text: PropTypes.string
}
