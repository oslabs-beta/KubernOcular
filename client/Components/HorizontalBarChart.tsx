import React, { FC, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import colors from '../colors';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

type MetricProps = {
  label: string;
};

const initialData: ChartData<'bar'> = {
  datasets: [],
};

const labels = ['CPU Usage %'];

const HorizontalBarChart: FC<MetricProps> = () => {
  const [data, setData] = useState(initialData);

  const options: ChartOptions<'bar'> = {
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
      },
      y: {
        display: false,
      },
    },
    plugins: {
      datalabels: {
        color: '#cee2fd',
        font: {
          weight: 'bold',
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
      .then((res) => res.json())
      .then((data) => {
        const usefulData =
          data.data.result[0].values[data.data.result[0].values.length - 1];
        const chartData = Number(usefulData[1]);
        const backgroundColor =
          chartData >= 90 ? colors.translucent.red : colors.translucent.green;

        const newData: ChartData<'bar'> = {
          labels: labels,
          datasets: [
            {
              label: 'Dataset 1',
              data: [chartData],
              borderColor: backgroundColor,
              backgroundColor: backgroundColor,
              datalabels: {
                align: 'center',
                anchor: 'center',
              },
            },
          ],
        };
        setData(newData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id="horizontal-bar-chart" className="instant-metric-comp">
      <Bar options={options} data={data} />
    </div>
  );
};

export default HorizontalBarChart;
