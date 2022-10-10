import React, { FC } from 'react';
import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  ArcElement, 
} from 'chart.js';
import colors from '../colors';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

type MetricProps = {
  label: string,
}

interface FetchedData { heapSizeUsed: number, heapSizeBytes: number, difference: number, percentage: number }
const dataArg: FetchedData = {
  heapSizeUsed: 0, 
  heapSizeBytes: 0,
  difference: 0,  
  percentage: 0,
}

const SpeedometerChart: FC<MetricProps> = () => {

  const [chartData, setChartData] = useState(dataArg);

  useEffect((): void => {
    fetch('/api/dashboard/general')
    .then(res => res.json())
    .then(data => {
      const fetchedData: FetchedData = {
        heapSizeUsed: Number((data.heapSizeUsed / 1000000).toFixed(2)),
        heapSizeBytes: Number((data.heapSizeBytes / 1000000).toFixed(2)),
        difference: Number((data.heapSizeBytes / 1000000 - data.heapSizeUsed / 1000000).toFixed(2)),
        percentage: data.heapSizeUsed / data.heapSizeByes,
        // color: this.percentage > .9 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)',
      };
      setChartData(fetchedData);
    })
    .catch(err => console.log(err));
  }, []);

  const options: ChartOptions<'doughnut'> = {
    animation: {
      easing: "easeInCubic",
      duration: 1200,
    },
    responsive: true,
    maintainAspectRatio: false,
    rotation: 270, // start angle in degrees
    circumference: 180, // sweep angle in degrees
    plugins: {
      datalabels: {
        color: "#e1eeff",
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Heap Size Used / Heap Size Bytes',
        color: '#e1eeff'
      }
    }
  }
  
  const data: ChartData<'doughnut'> = {
    labels: ['Heap Size Used (MB)', 'Heap Size Remaining (MB)'],
    datasets: [
      {
        data: [chartData.heapSizeUsed, chartData.difference],
        backgroundColor: [
          colors.translucent.comment,
          'rgba(255, 255, 255, 0.01',
        ],
        borderColor: [
          colors.solid.comment,
          'rgba(255, 255, 255, 0.05',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div id="speedometer-chart" className='instant-metric-comp'>
    < Doughnut options={options} data={data} />
    </div>
  )
}

export default SpeedometerChart;