import React from "react";
import { FC } from 'react';
import { useNavigate } from 'react-router-dom'

const NodeDisplay: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div id="dashboard-container">
        <div>NODE INFO: TBD</div>
        <button onClick={()=> navigate('/nodes')}>Back</button>
      </div>
    </div>
  )
};

export default NodeDisplay;