import React from 'react'
import './style.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Nav from './Components/Nav';
import Dashboard from "./Components/Dashboard";
import PodsTab from "./Components/PodsTab";
import NodesTab from "./Components/NodesTab";
import { Routes, Route } from 'react-router-dom';
import PodDisplay from './Components/PodDisplay';
import NodeDisplay from './Components/NodeDisplay';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div id="main-container">
        <Nav />
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/pods' element={<PodsTab />} />
          <Route path='/nodes' element={<NodesTab />} />
          <Route path='/poddisplay' element={<PodDisplay />} />
          <Route path='/nodedisplay' element={<NodeDisplay />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App;