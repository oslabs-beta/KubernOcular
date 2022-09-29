import React from "react";
import { FC } from 'react';
import LineGraph from "./LineGraph";
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NodeDisplay: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pod = searchParams.get("podname")
  const navigate = useNavigate();
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
    <div id="dashboard-container">
      <LineGraph label={`CPU Usage: ${pod}`} query={`/api/pod/cpu?pod=${pod}`} backgroundColor="rgba(54, 162, 235, 0.2)" borderColor="rgba(54, 162, 235, 1)" yAxisType="percent"/>
      <LineGraph label={`Memory Usage: ${pod}`} query={`/api/pod/mem?pod=${pod}`} backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)" yAxisType="gigabytes"/>
    </div>
  </div>
  )
};

export default NodeDisplay;