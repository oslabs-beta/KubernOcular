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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
    label: 'Memory Usage Over Time',
    data: randomData,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
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
      text: 'Memory Usage',
    },
  },
};

const MemoryUsage: FC = () => {
  return (
    <div className="graph">
      < Line options={options} data={data} />
    </div>
  )
};

export default MemoryUsage;