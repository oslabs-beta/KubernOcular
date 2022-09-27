import React from "react";
import { FC } from 'react';
import { Link } from 'react-router-dom';


const Nav: FC = () => {
  return (
    
    <nav>
      <div id="logo">
        <img id="kubernocular-logo" src="https://cdn.discordapp.com/attachments/1018271546650935399/1024030372276744283/ko_fav2.png"/> 
      </div>
      <div id="tabs">
      <Link to='/'><button>Dashboard</button></Link>
      <Link to='/pods'><button>Pods</button></Link>
      <Link to='/nodes'><button>Nodes</button></Link>
      </div>
    </nav>
    
  )
};

export default Nav;