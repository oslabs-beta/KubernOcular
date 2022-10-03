import React from "react";
import { FC } from 'react';
import LineGraph from "./LineGraph";

const Dashboard: FC = () => {
  return (
    <div>
      <div id='dashboard-container'>
        <LineGraph label='CPU Usage' query='/api/dashboard/cpu' backgroundColor="rgba(54, 162, 235, 0.2)" borderColor="rgba(54, 162, 235, 1)" yAxisType="percent"/>
        <LineGraph label='Memory Usage' query='/api/dashboard/mem' backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)" yAxisType="gigabytes"/>
        <LineGraph label='Node Bytes Transmitted' query='/api/dashboard/transmit' backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)" yAxisType="kilobytes"/>
        <LineGraph label='Node Bytes Received' query='/api/dashboard/receive' backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)" yAxisType="kilobytes"/>
      </div>
    </div>
  )
};

export default Dashboard;