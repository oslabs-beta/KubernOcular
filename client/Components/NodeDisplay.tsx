import React from "react";
import { FC } from 'react';
import LineGraph from "./LineGraph";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NodeDisplay: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nodeIP = searchParams.get("nodeip");
  const nodeName = searchParams.get("name");
  const navigate = useNavigate();
  const [customGraphs, setCustomGraphs] = React.useState<JSX.Element[]>([]);

  React.useEffect((): void => {
    const newCustomGraphs: JSX.Element[] = [];
    fetch('/api/custom/list?scope=node')
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
                label={`${metric.name}: ${nodeName}`}
                query={`/api/custom/queries?scope=node&index=${index}&nodeIP=${nodeIP}`} 
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
          onClick={()=> navigate('/nodes')}
          >
          Back to Nodes
        </Button>
      </div>
      <div id="metric-graphs">
        <LineGraph label={`Network Received Bytes Total: ${nodeName}`} query={`/api/node/receive?nodeIP=${nodeIP}`} backgroundColor="rgba(54, 162, 235, 0.2)" borderColor="rgba(54, 162, 235, 1)" yAxisType="kilobytes"/>
        <LineGraph label={`Network Transmit Bytes Total: ${nodeName}`} query={`/api/node/transmit?nodeIP=${nodeIP}`} backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)" yAxisType="kilobytes"/>
        {customGraphs}
      </div>
  </div>
  )
};

export default NodeDisplay;