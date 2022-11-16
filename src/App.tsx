import React, { useContext } from "react";
import './App.scss';
import { Routes, Route } from 'react-router-dom';
// import Home from './Home';
// import defaultContext from "./context/defaults"
import Home from './Home';
import Modal from "./components/Modal"
// import {ModalData} from "./ts/interfaces"
import AppContext from "./AppContext"

function App() {
  console.log({AppContext});
  
  const appCtx = useContext(AppContext)
  console.log({appCtx});
  const { modal } = appCtx
  const showModal = modal.active

  return (
    <div className="App">
      <AppContext.Provider value={appCtx}>
        { showModal && <Modal />}
        <header className="App-header">
        </header>

        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
