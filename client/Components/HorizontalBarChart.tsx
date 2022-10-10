import React, { FC, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import ChartDataLabels from "chartjs-plugin-datalabels";

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
  CoreChartOptions
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);
import colors from '../colors';

type MetricProps = {
  label: string,
}

const initialData: ChartData<'bar'> = {
  datasets: [],
}

const labels = ["CPU Usage %"];
// const mockData = [Math.floor(Math.random() * 99)]; // const usefulData = data.data.result[0].values[data.data.result[0].values.length - 1];v
// // const backgroundColor = mockData > 90 ? "rgba(255, 99, 132, 0.5)" : "rgba(75, 192, 192, 0.5)";
// const backgroundColor = ["rgba(255, 99, 132, 0.5)"];

const HorizontalBarChart: FC<MetricProps> = (props) => {
  const [data, setData] = useState(initialData);
  
  const options: ChartOptions<'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
      // aspectRatio:
      indexAxis: "y",
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
        },
        y: {
          display: false,
        }
      },
      plugins: {
        datalabels: {
          color: "#cee2fd",
          font: {
            weight: "bold",
          },
          formatter: Math.round,
        },
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'CPU Usage %',
          color: '#e1eeff',
        },
      },
    };

    useEffect(() => {
      fetch('../api/dashboard/cpu')
      .then(res => res.json())
      .then(data => {
        const usefulData = data.data.result[0].values[data.data.result[0].values.length - 1];
        const chartData = Number(usefulData[1]);
        console.log('horizontal bar chart', usefulData)
        const backgroundColor = chartData >= 90 ? colors.translucent.red : colors.translucent.green;

  const newData: ChartData<'bar'> = {
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [chartData],
        // borderColor: "rgba(255, 99, 132, 0.5)",
        // backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: backgroundColor,
        backgroundColor: backgroundColor,
        datalabels: {
          align: "center",
          anchor: "center",
        },
      },
    ],
  };
  setData(newData);
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <div id="horizontal-bar-chart" className="instant-metric-comp">
      <Bar options={options} data={data} />
    </div>
  );
};

export default HorizontalBarChart;

/*

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, 
  ChartDataLabels
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  // aspectRatio: 
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 100, 
      ticks: {
        // autoSkip: false,
        // maxRotation: 90,
        // minRotation: 90,
        // padding: -110
      }
    }
  },
  // this is not working... yet
  plugins: {
    datalabels: {
      color: 'white',
      // display: function(context) {
      //   return context.dataset.data[context.dataIndex] > 15;
      // },
      font: {
        weight: 'bold'
      },
      formatter: Math.round
    },
    legend: {
      display: false,
    }
  }
};

const labels = ['CPU Usage %'];
const mockData = [Math.floor(Math.random() * 99)];
const backgroundColor = mockData > 90 ? 'rgba(255, 99, 132, 0.5)' : 'rgba(75, 192, 192, 0.5)';

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: mockData,
      borderColor: backgroundColor,
      backgroundColor,
      datalabels: {
        align: 'center',
        anchor: 'center'
      }
    },
  ],
};

export default function HorizontalBarChart() {
  return (
    <div class="bar-chart">
      <Bar options={options} data={data} />
    </div>
  )
}



*/
