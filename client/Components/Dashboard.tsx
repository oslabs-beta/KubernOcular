import React from "react";
import { useState } from "react";
import { FC } from 'react';
import Nav from './Nav';
import LineGraph from "./LineGraph";
import PodDisplay from "./PodDisplay";

// import { allChartData, ConfigBlock, CoreData } from "./ClusterGraphs/ClusterDummyData";

const Dashboard: FC = () => {
  
  return (
    <div>
      <div id="dashboard-container">
        <LineGraph label='CPU Usage' query='/api/dashboard/cpu' backgroundColor="rgba(54, 162, 235, 0.2)" borderColor="rgba(54, 162, 235, 1)"/>
        <LineGraph label='Memory Usage' query='/api/dashboard/mem' backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)"/>
      </div>
      {/* <div id="test-pod-container">
        <PodDisplay pod="prometheus-prometheus-kube-prometheus-prometheus-0"/>
      </div> */}
    </div>
  )
};

export default Dashboard;