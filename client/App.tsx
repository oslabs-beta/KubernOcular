import React from 'react'
import './style.css';
import Nav from './Components/Nav';
import Dashboard from "./Components/Dashboard";
import PodsTab from "./Components/PodsTab";
import NodesTab from "./Components/NodesTab";
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div id="main-container">
    <Nav />

    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/pods' element={<PodsTab />} />
      <Route path='/nodes' element={<NodesTab />} />
    </Routes>
    </div>
  )
}

export default App;