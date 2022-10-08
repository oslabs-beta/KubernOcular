import * as React from 'react';
import { FC } from 'react';
import axios from "axios";
import LineGraph from "./LineGraph";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import StackedBarChart from './StackedBarChart';
import HorizontalBarChart from './HorizontalBarChart';
import NavInstantMetricsTable from './NavInstantMetricsTable';
import SpeedometerChart from './SpeedometerChart';
import colors from '../colors';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard: FC = () => {
  const [customGraphs, setCustomGraphs] = React.useState<JSX.Element[]>([]);

  React.useEffect((): void => {
    const newCustomGraphs: JSX.Element[] = [];
    fetch('/api/custom/list?scope=cluster')
      .then(res => res.json())
      .then(data => {
        data.forEach((metric: any, index: number) => {
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
        {/* <div id="instant-metrics">
          <Box sx={{ flexGrow: 1, padding: '0px' }}>
            <Grid container id='num-info' spacing={2}>
              {numInfo}
            </Grid>
          </Box>
        </div> */}
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