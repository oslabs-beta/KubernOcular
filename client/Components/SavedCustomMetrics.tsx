import React from "react";
import { FC, useState, useEffect } from 'react';

const SavedCustomMetrics: FC = () => {
  const defaultMetricNames: string[] = [];
  const [scope, setScope] = useState('cluster');
  const [metricNames, setMetricNames] = useState(defaultMetricNames);

  const resetMetricNames = () => {
    fetch(`/api/custom/list?scope=${scope}`)
      .then(res => res.json())
      .then(data => {
        const newMetricNames: string[] = [];
        for (const el of data) {
          newMetricNames.push(el.name);
        }
        setMetricNames(newMetricNames);
      })
  }

  useEffect(resetMetricNames, [scope])

  const handleDelete = async (index: number) => {
    const didDelete = await fetch('/api/custom/queries', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({scope, id: index})
    })
    if (didDelete) {
      resetMetricNames();
    }
  }

  const metricsList = [];
  for (let i = 0; i < metricNames.length; i++) {
    metricsList.push(<li>{metricNames[i]} {<button onClick={() => handleDelete(i)}>X</button>/* delete button with i passed in as prop */}</li>)
  }
  return (
    <div>
      <h4>Saved Metrics</h4>
      <ul>
        {metricsList}
      </ul>
    </div>
  )
}

export default SavedCustomMetrics;