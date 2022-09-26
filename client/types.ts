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