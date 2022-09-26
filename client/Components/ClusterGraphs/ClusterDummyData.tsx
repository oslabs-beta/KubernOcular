import { CoreData, ConfigBlock } from "../../types"


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

export const dummyCpuUsage = {
  "status": "success",
  "data": {
    "resultType": "matrix",
    "result": [
      {
        "metric": {},
        "values": [
          [
            1664120438.289,
            "0.004045216454755024"
          ],
          [
            1664127638.289,
            "0.008172601949068282"
          ],
          [
            1664134838.289,
            "0.0036087778981663218"
          ],
          [
            1664142038.289,
            "0.005231392779731696"
          ],
          [
            1664149238.289,
            "0.002516597239151966"
          ],
          [
            1664156438.289,
            "0.27276712226277844"
          ],
          [
            1664163638.289,
            "0.09214097746320987"
          ],
          [
            1664170838.289,
            "0.0036038313324806334"
          ],
          [
            1664178038.289,
            "0.003904067266994205"
          ],
          [
            1664185238.289,
            "0.0038261593078194947"
          ],
          [
            1664192438.289,
            "0.0037635789896383835"
          ],
          [
            1664199638.289,
            "0.3008927906914449"
          ],
          [
            1664206838.289,
            "0.3666134874361999"
          ]
        ]
      }
    ]
  }
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