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