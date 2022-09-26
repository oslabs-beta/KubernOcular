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



const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: 'rgba(255, 206, 86, 0.2)',
    borderColor: 'rgba(255, 206, 86, 1)',
    borderWidth: 5,
    // pointRadius: 0,
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

const Network: FC = () => {
  return (
    <div>
      < Line options={options} data={data} />
    </div>
  )
};

export default Network;