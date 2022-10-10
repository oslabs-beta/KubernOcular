import * as React from 'react';
import { FC } from 'react';
import LineGraph from "./LineGraph";
import StackedBarChart from './StackedBarChart';
import HorizontalBarChart from './HorizontalBarChart';
import NavInstantMetricsTable from './NavInstantMetricsTable';
import SpeedometerChart from './SpeedometerChart';
import colors from '../colors';

const Dashboard: FC = () => {
  const [customGraphs, setCustomGraphs] = React.useState<JSX.Element[]>([]);

  React.useEffect((): void => {
    const newCustomGraphs: JSX.Element[] = [];
    fetch('/api/custom/list?scope=cluster')
      .then(res => res.json())
      .then(data => {
        data.forEach((metric: Record<string, string>, index: number) => {
          if(metric.active) {
            const customColors: number[] = [];
            for (let i = 0; i < 3; i++) {
              customColors.push(Math.floor(Math.random() * 256))
            }
            newCustomGraphs.push(
              <LineGraph 
                label={metric.name}
                query={`/api/custom/queries?scope=cluster&index=${index}`} 
                backgroundColor={`rgba(${customColors[0]}, ${customColors[1]}, ${customColors[2]}, 0.2)`}
                borderColor={`rgba(${customColors[0]}, ${customColors[1]}, ${customColors[2]}, 1)`}
                yAxisType={metric.yAxisType}/>
            )
          }
        })
        setCustomGraphs(newCustomGraphs);
      })
  }, [])
  
  return (
    <div id="db-container">
      <div id="instant-metrics-container">
        < StackedBarChart label='User and System CPU Time'/>
        < SpeedometerChart label='Process Heap Size from Node' />
        < NavInstantMetricsTable label="Instant Metrics" />
        < HorizontalBarChart label="Total CPU Usage" />
      </div>
      <div id='metric-graphs'>
        <LineGraph label='CPU Usage' query='/api/dashboard/cpu' backgroundColor={colors.translucent.purple} borderColor={colors.solid.purple} yAxisType="percent"/>
        <LineGraph label='Memory Usage' query='/api/dashboard/mem' backgroundColor={colors.translucent.cyan} borderColor={colors.solid.cyan} yAxisType="gigabytes"/>
        <LineGraph label='Node Bytes Transmitted' query='/api/dashboard/transmit' backgroundColor={colors.translucent.orange} borderColor={colors.solid.orange} yAxisType="kilobytes"/>
        <LineGraph label='Node Bytes Received' query='/api/dashboard/receive' backgroundColor={colors.translucent.pink}  borderColor={colors.solid.pink} yAxisType="kilobytes"/>
        {customGraphs}
      </div>
    </div>
  )
};

export default Dashboard;