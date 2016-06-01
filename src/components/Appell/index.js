import React, { Component } from 'react'
import TypeWriter from 'react-typewriter'
import styles from './styles.css'

const labels = [
  'developers',
  'beginners',
  'engineers',
  'hackers',
  'professionals'
]

export default class Appell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      labelIndex: 0,
      typing: 0
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ typing: 1 })
    }, 2000)
  }

  handleOnTypingEnd = () => {
    const delay = this.state.typing === -1 ? 0 : 1000
    let labelIndex = this.state.typing === -1 ? this.state.labelIndex + 1 : this.state.labelIndex

    if (this.state.labelIndex === labels.length) {
      labelIndex = 0
    }

    setTimeout(() => {
      this.setState({
        typing: this.state.typing === -1 ? 1 : -1,
        labelIndex
      })
    }, delay)
  };

  render() {
    return (
      <div className={styles.root}>
        for{' '}
        <TypeWriter
          typing={this.state.typing}
          minDelay={100}
          maxDelay={200}
          onTypingEnd={this.handleOnTypingEnd}
        >
          {labels[this.state.labelIndex]}
        </TypeWriter>
        <span className={styles.cursor} />
      </div>
    )
  }
}
