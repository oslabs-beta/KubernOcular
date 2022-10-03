import * as React from 'react';
import { FC } from 'react';
import axios from "axios";
import LineGraph from "./LineGraph";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard: FC = () => {
  const [numInfo, setNumInfo] =  React.useState<JSX.Element[]>([]);

  React.useEffect((): void => {
    const fetchNumInfo = async () => {
        const allNumInfo = await axios.get('../api/dashboard/num');
        const tempArray: JSX.Element[] = [];
        for (const element in allNumInfo.data) {
          tempArray.push(
            <Grid>
              <Item>
                <Box
                  id={element}
                  sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                >
                  {element}
                </Box>
                <Box component="ul" aria-labelledby={element} sx={{ pl: 0, fontSize: '20px' }}>
                  {allNumInfo.data[element]}
                </Box>
              </Item>
            </Grid>
          )
        }
        setNumInfo(tempArray);
    }
    fetchNumInfo();
  }, [])

  return (
    <div>
      <div id="box-container">
        <Box sx={{ flexGrow: 1, padding: '0px' }}>
          <Grid container id='num-info' spacing={2}>
            {numInfo}
          </Grid>
        </Box>
      </div>
      <div id='cpu-mem-graphs'>
        <LineGraph label='CPU Usage' query='/api/dashboard/cpu' backgroundColor="rgba(54, 162, 235, 0.2)" borderColor="rgba(54, 162, 235, 1)" yAxisType="percent"/>
        <LineGraph label='Memory Usage' query='/api/dashboard/mem' backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)" yAxisType="gigabytes"/>
        <LineGraph label='Node Bytes Transmitted' query='/api/dashboard/transmit' backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)" yAxisType="kilobytes"/>
        <LineGraph label='Node Bytes Received' query='/api/dashboard/receive' backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)" yAxisType="kilobytes"/>
      </div>
    </div>
  )
};

export default Dashboard;