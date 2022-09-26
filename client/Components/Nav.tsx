import React from "react";
import { FC } from 'react';
import { Link } from 'react-router-dom';


const Nav: FC = () => {
  return (
    
    <nav>
      {/* <div id="logo">Logo</div> */}
      <Link to='/'><button>Dashboard</button></Link>
      <Link to='/pods'><button>Pods</button></Link>
      <Link to='/nodes'><button>Nodes</button></Link>
      
    </nav>
    
  )
};

export default Nav;