import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import { appMountId } from '../config'

render(
  <App />,
  document.getElementById(appMountId)
)
