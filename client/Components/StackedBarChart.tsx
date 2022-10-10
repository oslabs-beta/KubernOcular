import React, { FC, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { BorderColor } from '@mui/icons-material';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
import colors from '../colors';


type MetricProps = {
  label: string,
}

const initialData: ChartData<'bar'> = {
  datasets: [],
}

const StackedBarChart: FC<MetricProps> = (props) => {
  const [data, setData] = useState(initialData);

  const options: ChartOptions<'bar'> = {
    animation: {
      easing: "easeInCubic",
      duration: 1200,
    },
    plugins: {
      datalabels: {
        color: '#e1eeff',
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'User & System CPU Time',
        color: '#e1eeff',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        display: false,
      },
      y: {
        stacked: true,
      },
    },
  }

  useEffect(() => {
    fetch('../api/dashboard/general')
    .then(res => res.json())
    .then(data => {
      const data1 = data.totalSystemCpu.toFixed(2);
      const data2 = data.totalUserSystemCpu.toFixed(2);
      const newData: ChartData<'bar'> = {
        labels: [props.label],
        datasets: [
        {
          label: 'total user CPU time',
          data: [data1],
          backgroundColor: colors.translucent.cyan,
          borderColor: colors.solid.cyan,
        },
        {
          label: 'total system CPU time',
          data: [data2],
          backgroundColor: colors.translucent.purple,
          borderColor: colors.solid.purple,
        },
        ] 
      } 
      setData(newData);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div id="stacked-bar-chart" className='instant-metric-comp'>
      < Bar options={options} data={data} />
    </div>
  )
}

export default StackedBarChart;