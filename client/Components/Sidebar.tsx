import React from "react";
import { FC } from 'react';

const Sidebar: FC = () => {
  return (
    <div id="nav-bar">
      <div id="logo">Logo</div>
      <div id="pods">Pods</div>
      <div id="nodes">Nodes</div>
    </div>
  )
};

export default Sidebar;