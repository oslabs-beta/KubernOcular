import React, { useEffect } from "react";
import { FC, useState } from 'react';
import { Line } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
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
import { time } from "console";
import { setConstantValue } from "typescript";

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


const LineGraph: FC<MetricProps> = (props) => {
  const [chartLoaded, setChartLoaded] = useState(false);
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
  useEffect(() => {
    fetch(props.query)
    .then(res => res.json())
    .then(data => {
      const usefulData = data.data.result[0].values;
      let displayDate = true;
      let prevDate = '';
      const xAxisLabels = usefulData.map((value: [number, string]) => {
        // logic for converting timestamp to human-readable time
        const currentDate = new Date(value[0] * 1000);
        let timeString = currentDate.toLocaleString('en-GB');
        if (timeString.slice(0, 10) !== prevDate.slice(0,10)) displayDate = true;
        prevDate = timeString;
        if (!displayDate) {
          const iOfComma = timeString.indexOf(',') + 1;
          timeString = timeString.slice(iOfComma).trim();
        }
        displayDate = false;
        return timeString;
      });
      console.log('xAxisLabels:', xAxisLabels)
      console.log('Useful data:', usefulData);
      const yAxisValues: number[] = usefulData.map((value: [number, string]) => Number(value[1]))
      console.log('yAxisValues', yAxisValues);
      const newData: ChartData<'line'> = {
        labels: xAxisLabels,
        datasets: [{
          label: props.label,
          data: yAxisValues,
          backgroundColor: props.backgroundColor,
          borderColor: props.borderColor,
          borderWidth: 1.5,
          pointRadius: 1,
          tension: 0.3
        }]
      }
      setData(newData);
      // setOptions(newOptions);
      setChartLoaded(true);
    })
    .catch(err => console.log(err));
  }, [])

  // demos 1 sec load, comment out lines 102, 103, and or statement in 105 to remove
  const [oneSecPassed, setOneSecPassed] = useState(false);
  setTimeout(() => setOneSecPassed(true), 1000);
  
  if (!chartLoaded || !oneSecPassed) {
    return (
      <div className="loading">
        < CircularProgress />
      </div>
    )
  } else {  
    return (
      <div className="graph">
        < Line options={options} data={data} />
      </div>
    )
  }
}

export default LineGraph;



