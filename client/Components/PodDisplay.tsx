import React from "react";
import { FC } from 'react';
import LineGraph from "./LineGraph";
import { useNavigate, useSearchParams } from 'react-router-dom'

const PodDisplay: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pod = searchParams.get("podname")
  const navigate = useNavigate();
  return (
    <div>
      <div id="dashboard-container">
        <LineGraph label={`CPU Usage: ${pod}`} query={`/api/pod/cpu?pod=${pod}`} backgroundColor="rgba(54, 162, 235, 0.2)" borderColor="rgba(54, 162, 235, 1)" yAxisType="percent"/>
        <LineGraph label={`Memory Usage: ${pod}`} query={`/api/pod/mem?pod=${pod}`} backgroundColor="rgba(255, 99, 132, 0.2)" borderColor="rgba(255, 99, 132, 1)" yAxisType="gigabytes"/>
        <button onClick={()=> navigate('/pods')}>Back</button>
      </div>
    </div>
  )
};

export default PodDisplay;