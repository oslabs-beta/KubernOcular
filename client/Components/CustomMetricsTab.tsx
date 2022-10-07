import React from 'react';
import { FC } from 'react';
import CustomMetricsForm from './CustomMetricsForm';
import SavedCustomMetrics from './SavedCustomMetrics'

const CustomMetricsTab = () => {
    return (
        <div>
            <CustomMetricsForm />
            <SavedCustomMetrics />
        </div>
    )
  }
  
  export default CustomMetricsTab;