import React from "react";
import { FC } from 'react';

const CustomMetricsForm: FC = () => {
  const [metricName, setMetricName] = React.useState('');
  const [promQuery, setPromQuery] = React.useState('');
  const [yAxisType, setYAxisType] = React.useState('');
  const [scope, setScope] = React.useState('');

  return (
    <div>
        <h4>CustomMetricsForm</h4>
    </div>
  )
}

export default CustomMetricsForm;