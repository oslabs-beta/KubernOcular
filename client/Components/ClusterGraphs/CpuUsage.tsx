import React from "react";
import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { CoreData } from './ClusterDummyData';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Chart from 'chart.js/auto';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Randominzing Data
let labels: number[] = []
let randomData: number[] = [];
const push: any = () => { 
  for(let i = 0; i <= 100; i+= 5) {
    labels.push(i);
    randomData.push(Math.random() * 100);
  };
}
push();
console.log('labels', labels)

const data = {
  labels,
  datasets: [{
    label: 'CPU Usage Over Time',
    data: randomData,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 3,
    pointRadius: 1,
    tension: 0.3,
  }]
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'CPU Usage',
    },
  },
};


type CpuUsageProps = {DummyData: CoreData}
// type CpuUsageProps = {allChartData: ChartData}

const CpuUsage = ( props: CpuUsageProps ) => {
  console.log('props: ', props)
  return (
    <div className="graph">
      < Line options={options} data={data}/>
    </div>
  )
};

export default CpuUsage;