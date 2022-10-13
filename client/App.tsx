import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from './Components/Drawer';
import './style.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Drawer />
      </ThemeProvider>
    </div>
  );
};

export default App;
