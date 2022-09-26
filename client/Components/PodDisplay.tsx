import React from "react";
import { useState } from "react";
import { FC } from 'react';
import Nav from './Nav';
import LineGraph from "./LineGraph";
import { useNavigate } from 'react-router-dom'

// import { allChartData, ConfigBlock, CoreData } from "./ClusterGraphs/ClusterDummyData";

type PodDisplayProps = {pod: string}

const PodDisplay: FC<PodDisplayProps> = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <div id="dashboard-container">
        <LineGraph label={`CPU Usage: ${props.pod}`} query={`/api/pod/cpu?pod=${props.pod}`} backgroundColor="rgba(54, 162, 235, 0.2)" borderColor="rgba(54, 162, 235, 1)"/>
        <LineGraph label={`Memory Usage: ${props.pod}`} query={`/api/pod/mem?pod=${props.pod}`} backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)"/>
        <button onClick={()=> navigate('/pods')}>Back</button>
      </div>
    </div>
  )
};

export default PodDisplay;