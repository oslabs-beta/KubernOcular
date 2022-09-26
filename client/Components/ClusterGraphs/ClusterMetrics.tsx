import React from "react";
import { FC, useState } from 'react';
import { Line } from 'react-chartjs-2';
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
  ChartData
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

type MetricProps = {
  query: string,
  label: string,
  backgroundColor: string,
  borderColor: string
}

const initialData: ChartData<'line'> = {
  datasets: [],
}



const ClusterMetrics: FC<MetricProps> = (props) => {
  const [chartLoaded, setChartLoaded] = useState(false);
  // const [options, setOptions] = useState(null);
  const [data, setData] = useState(initialData);
  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  }
  fetch(props.query)
    .then(res => res.json())
    .then(data => {
      const usefulData = data.data.result[0].values[0];
      const xAxisLabels: number[] = [];
      usefulData.forEach((value: [number, string]) => {
        // logic for converting timestamp to human-readable time
        xAxisLabels.push(value[0]);
      });
      const yAxisValues: number[] = usefulData.map((value: [number, string]) => Number(value[1]))
      const newData: ChartData<'line'> = {
        labels: xAxisLabels,
        datasets: [{
          label: props.label,
          data: yAxisValues,
          backgroundColor: props.backgroundColor,
          borderColor: props.borderColor,
          borderWidth: 3,
          pointRadius: 1,
          tension: 0.3
        }]
      }
      setData(newData);
      // setOptions(newOptions);
      setChartLoaded(true);
    })
    .catch(err => console.log(err));

  
  if (!chartLoaded) {
    return (
      <p>Loading Chart</p>
    )
  } else {  
    return (
      < Line options={options} data={data} />
    )
  }
}



