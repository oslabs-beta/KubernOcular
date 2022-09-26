import React from "react";
import { useState } from "react";
import { FC } from 'react';
import Nav from './Nav';
import MemoryUsage from "./ClusterGraphs/MemoryUsage";
import CpuUsage from "./ClusterGraphs/CpuUsage";
import Network from "./ClusterGraphs/Network";
import GarbageCollection from "./ClusterGraphs/GarbageCollection";
import {DummyData, Options} from './ClusterGraphs/ClusterDummyData';
import { CoreData, ConfigBlock } from "../types";

// import { allChartData, ConfigBlock, CoreData } from "./ClusterGraphs/ClusterDummyData";

const Dashboard: FC = () => {

  const [dummyData, setDummyData] = useState({
    labels: DummyData.labels,
    datasets: DummyData.datasets,
  });

  // const [options, setOptions] = useState({
  //   responsive: Options.responsive,
  //   plugins: Options.responsive,
  // });
  
  return (
    <div>
      < Nav />
      <div id="dashboard-container">
        <MemoryUsage />
        <CpuUsage DummyData={dummyData}/> 
        {/* <Network /> 
        <GarbageCollection /> */}
      </div>
    </div>
  )
};

export default Dashboard;