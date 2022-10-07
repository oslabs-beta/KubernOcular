import React from "react";
import { FC } from 'react';

const CustomMetricsForm: FC = () => {
  const [metricName, setMetricName] = React.useState('');
  const [promQuery, setPromQuery] = React.useState('');
  const [yAxisType, setYAxisType] = React.useState('');
  const [scope, setScope] = React.useState('');

  // form
  // Metric name - text box (text field) // PromQL query - text box (text field)
  // Y axis type - dropdown menu - percent, GB, KB (select) // scope - dropdown menu - cluster, node, pod (select)
  // submit button (make all fields required)

  return (
    <div>CustomMetricsForm</div>
  )
}

export default CustomMetricsForm;