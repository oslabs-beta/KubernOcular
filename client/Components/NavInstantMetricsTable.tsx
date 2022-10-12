import React, { FC, useEffect } from 'react';
import { useState } from 'react';

type MetricProps = {
  label: string;
};

const NavInstantMetricsTable: FC<MetricProps> = (props) => {
  const [metricDivs, setMetricDivs] = useState<JSX.Element[]>([]);

  useEffect(() => {
    fetch('../api/dashboard/num')
      .then((res) => res.json())
      .then((data) => {
        const newMetricDivs: JSX.Element[] = [];
        for (const prop in data) {
          newMetricDivs.push(
            <div className="metric-box">
              <div className="metric-label">{prop}</div>
              <div className="metric-value">{data[prop]}</div>
            </div>
          );
        }
        setMetricDivs(newMetricDivs);
      });
  }, []);

  return (
    <div id="nav-instant-metrics-table" className="instant-metric-comp">
      {metricDivs}
    </div>
  );
};

export default NavInstantMetricsTable;
