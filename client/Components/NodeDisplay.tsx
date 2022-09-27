import React from "react";
import { useState } from "react";
import { FC } from 'react';
import Nav from './Nav';
import LineGraph from "./LineGraph";
import { useNavigate, useSearchParams } from 'react-router-dom'
// import { allChartData, ConfigBlock, CoreData } from "./ClusterGraphs/ClusterDummyData";

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