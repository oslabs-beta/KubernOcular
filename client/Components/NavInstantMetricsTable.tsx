import React, { FC, useEffect } from 'react';
import { useState } from 'react';

type MetricProps = {
  label: string,
}

const mockData = [1,2,3,4,5,6,7,8,9];

const NavInstantMetricsTable: FC<MetricProps> = (props) => {
  const [data, setData] = useState();
  const [metricDivs, setMetricDivs] = useState<JSX.Element[]>([]);

  useEffect(() => {
    fetch('../api/dashboard/num')
    .then(res => res.json())
    .then(data => {
      console.log('data in nav instant:', data)
      setData(data);
      const newMetricDivs: JSX.Element[] = [];
      for (const prop in data) {
        newMetricDivs.push(
          <div className='metric-box'>
            <div className='metric-label'>{prop}</div>
            <div className='metric-value'>{data[prop]}</div>
          </div>
        )
      }
      setMetricDivs(newMetricDivs);
    })
  }, []);

  return (
    <div id="nav-instant-metrics-table" className='instant-metric-comp'>
      {metricDivs}
    </div>
  )
}

export default NavInstantMetricsTable;