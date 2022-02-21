import React from 'react'
import logo from './images/logo.svg';

export default function Home() {
  return (
    <div>
        <img src={logo} className="App-logo" alt="logo" />

          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
              Learn React
          </a>
    </div>
  )
}
