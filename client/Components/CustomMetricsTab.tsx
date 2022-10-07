import React from 'react';
import { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CustomMetricsForm from './CustomMetricsForm';
import SavedCustomMetrics from './SavedCustomMetrics'

const CustomMetricsTab: FC = () => {
    return (
        <div>
            <Stack
            direction="row"
            spacing={2}
            >
                <Box sx={{ minWidth: 500 }}>
                    <CustomMetricsForm />
                </Box>
                <Box sx={{ minWidth: 500 }}>
                    <SavedCustomMetrics />
                </Box>
            </Stack>
        </div>
    )
  }
  
  export default CustomMetricsTab;