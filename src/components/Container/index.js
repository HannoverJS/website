import React, { PropTypes } from 'react'
import styles from './styles.css'

export default function Container({ children }) {
  return <div className={styles.root}>{children}</div>
}

Container.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}
