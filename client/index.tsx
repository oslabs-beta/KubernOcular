import React from "react";
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';


let root = createRoot(document.getElementById('root')!);
root.render(<App />)
// render(

//     <App />,

//     document.getElementById('root')
// );



// const container = document.getElementById('app');
// root = createRoot(container!); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);