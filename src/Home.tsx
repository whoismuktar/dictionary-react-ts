import React from 'react'
// import logo from './images/logo.svg';
import Search from "./components/Search"

export default function Home() {
  return (
    <div className='home'>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
              Learn React
          </a> */}

        <Search />
    </div>
  )
}
