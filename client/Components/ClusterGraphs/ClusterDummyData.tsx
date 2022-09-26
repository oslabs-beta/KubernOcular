export type CoreData = { 
  labels: string[],
  datasets: {
    label: string,
    data: number[],
    backgroundColor: string,
    borderColor: string,
    borderWidth: number,
    pointRadius?: number,
  }[]
};


export const DummyData: CoreData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 5,
    pointRadius: 0,
  }]
}

export type ConfigBlock = {
  responsive: boolean,
  plugins: {
    legend: {
      position: string
    }, 
    title: {
      display: boolean,
      text: string,
    }
  }
}

export const Options: ConfigBlock = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

export const allChartData = {
  DummyData,
  Options
}

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [10, 20, 30, 40, 35, 25, 15],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: [25, 10, 35, 20, 45, 15, 25],
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };