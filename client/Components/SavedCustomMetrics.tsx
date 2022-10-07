import React from "react";
import { FC, useState, useEffect } from 'react';

const SavedCustomMetrics: FC = () => {
  const defaultMetricNames: string[] = [];
  const defaultActive: boolean[] = [];
  const [scope, setScope] = useState('cluster');
  const [metricNames, setMetricNames] = useState(defaultMetricNames);
  const [active, setActive] = useState(defaultActive);

  const resetMetricDisplay = () => {
    fetch(`/api/custom/list?scope=${scope}`)
      .then(res => res.json())
      .then(data => {
        const newMetricNames: string[] = [];
        const newActive: boolean[] = [];
        for (const el of data) {
          newMetricNames.push(el.name);
          newActive.push(el.active);
        }
        setMetricNames(newMetricNames);
        setActive(newActive);
      })
  }

  useEffect(resetMetricDisplay, [scope])

  const handleDelete = async (index: number) => {
    const didDelete = await fetch('/api/custom/queries', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({scope, id: index})
    })
    if (didDelete.status === 200) {
      resetMetricDisplay();
    }
  }

  const handleChange = async (index: number) => {
    const didChangeActive = await fetch('/api/custom/active', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({scope, id: index, active: !active[index]})
    })
    if (didChangeActive.status === 200) {
      console.log('changed active status for', index);
      resetMetricDisplay();
    }
  }

  const metricsList = [];
  for (let i = 0; i < metricNames.length; i++) {
    metricsList.push(
      <li>{metricNames[i]}
        <input type="checkbox" checked={active[i]} onChange={() => handleChange(i)} />
        <button onClick={() => handleDelete(i)}>X</button>
      </li>)
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