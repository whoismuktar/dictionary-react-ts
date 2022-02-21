import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
// import Home from './Home';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>

      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
