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
      <LineGraph label={`Network Received Bytes Total: ${nodeName}`} query={`/api/node/receive?nodeIP=${nodeIP}`} backgroundColor="rgba(54, 162, 235, 0.2)" borderColor="rgba(54, 162, 235, 1)" yAxisType="kilobytes"/>
      <LineGraph label={`Network Transmit Bytes Total: ${nodeName}`} query={`/api/node/transmit?nodeIP=${nodeIP}`} backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)" yAxisType="kilobytes"/>
    </div>
  </div>
  )
};

export default NodeDisplay;