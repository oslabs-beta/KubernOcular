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
// import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  // ChartDataLabels
);
import colors from '../colors';


type MetricProps = {
  label: string,
  //query: string,
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
      // delay: 2000,
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
      // console.log('data', data);
      const data1 = data.totalSystemCpu.toFixed(2);
      const data2 = data.totalUserSystemCpu.toFixed(2);
      console.log('d1 and d2', data1, data2);
      const newData: ChartData<'bar'> = {
        labels: [props.label],
        datasets: [
        {
          label: 'total user CPU time',
          data: [data1],
          // backgroundColor: 'rgba(75, 192, 192, 0.4)',
          // backgroundColor: 'rgba(81,77,110, 0.4)',
          backgroundColor: colors.translucent.cyan,
          // borderColor: 'rgba(75, 192, 192, 1)',
          // borderColor:'rgba(81,77,110, 1)',
          borderColor: colors.solid.cyan,
        },
        {
          label: 'total system CPU time',
          data: [data2],
          // backgroundColor: 'rgba(255, 159, 64, 0.4)',
          // backgroundColor: 'rgba(95,121,156,0.6)',
          backgroundColor: colors.translucent.purple,
          // borderColor: 'rgba(255, 159, 64, 1)'
          // borderColor: 'rgba(95,121,156,1)',
          borderColor: colors.solid.purple,
        },
        ] 
      } 
      setData(newData);
    })
    .catch(err => console.log(err));
  }, []);

  console.log(data);

  return (
    <div id="stacked-bar-chart" className='instant-metric-comp'>
      < Bar options={options} data={data} />
    </div>
  )
}

export default StackedBarChart;