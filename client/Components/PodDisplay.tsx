import React from "react";
import { FC } from 'react';
import LineGraph from "./LineGraph";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PodDisplay: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pod = searchParams.get("podname")
  const navigate = useNavigate();
  const [customGraphs, setCustomGraphs] = React.useState<JSX.Element[]>([]);

  React.useEffect((): void => {
    const newCustomGraphs: JSX.Element[] = [];
    fetch('/api/custom/list?scope=pod')
      .then(res => res.json())
      .then(data => {
        data.forEach((metric: any, index: number) => {
          if (metric.active) {
            const customColors: number[] = [];
            for (let i = 0; i < 3; i++) {
              customColors.push(Math.floor(Math.random() * 256))
            }
            newCustomGraphs.push(
              <LineGraph 
                label={`${metric.name}: ${pod}`}
                query={`/api/custom/queries?scope=pod&index=${index}&pod=${pod}`} 
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
    <div>
      <div style={{display: 'flex', justifyContent: 'right'}}>
        <Button
          // variant="outlined"
          color="secondary"
          sx={{ mb: 2.5 }}
          startIcon={<ArrowBackIcon />}
          onClick={()=> navigate('/pods')}
          >
          Back to Pods
        </Button>
      </div>
      <div id="metric-graphs">
        <LineGraph label={`CPU Usage: ${pod}`} query={`/api/pod/cpu?pod=${pod}`} backgroundColor="rgba(54, 162, 235, 0.2)" borderColor="rgba(54, 162, 235, 1)" yAxisType="percent"/>
        <LineGraph label={`Memory Usage: ${pod}`} query={`/api/pod/mem?pod=${pod}`} backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)" yAxisType="gigabytes"/>
        {customGraphs}
      </div>
    </div>
  )
};

export default PodDisplay;