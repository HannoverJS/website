import React, { PropTypes } from 'react'
import styles from './styles.css'

/**
 * From: https://github.com/tobiasahlin/SpinKit/blob/master/css/spinners/1-rotating-plane.css
 */
export default function LoadingSpinner({ className }) {
  return <div className={`${styles.spinner} ${className}`}></div>
}

LoadingSpinner.propTypes = {
  className: PropTypes.string
}

