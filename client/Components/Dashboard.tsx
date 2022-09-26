import React from "react";
import { useState } from "react";
import { FC } from 'react';
import Nav from './Nav';
import ClusterMetrics from "./ClusterGraphs/ClusterMetrics";
import MemoryUsage from "./ClusterGraphs/MemoryUsage";
import CpuUsage from "./ClusterGraphs/CpuUsage";
import Network from "./ClusterGraphs/Network";
import GarbageCollection from "./ClusterGraphs/GarbageCollection";
import {DummyData, Options} from './ClusterGraphs/ClusterDummyData';
import { CoreData, ConfigBlock } from "../types";

// import { allChartData, ConfigBlock, CoreData } from "./ClusterGraphs/ClusterDummyData";

const Dashboard: FC = () => {
  
  return (
    <div>
      <div id="dashboard-container">
        <ClusterMetrics label='CPU Usage' query='/api/dashboard/cpu' backgroundColor="rgba(54, 162, 235, 0.2)" borderColor="rgba(54, 162, 235, 1)"/>
        <ClusterMetrics label='Memory Usage' query='/api/dashboard/mem' backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)"/>
        {/* <MemoryUsage /> */}
        {/* <CpuUsage DummyData={dummyData}/>  */}
        {/* <Network /> 
        <GarbageCollection /> */}
      </div>
    </div>
  )
};

export default Dashboard;