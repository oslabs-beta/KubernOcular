import React from 'react';
import { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CustomMetricsForm from './CustomMetricsForm';
import SavedCustomMetrics from './SavedCustomMetrics';

const CustomMetricsTab: FC = () => {
    const [updateList, setUpdateList] = React.useState(0);
    return (
        <div>
            <Stack
            direction="row"
            spacing={2}
            >
                <Box sx={{ minWidth: 700 }}>
                    <CustomMetricsForm setUpdateList={setUpdateList} updateList={updateList}/>
                </Box>
                <Box sx={{ minWidth: 500 }}>
                    <SavedCustomMetrics updateList={updateList} />
                </Box>
            </Stack>
        </div>
    )
  }
  
  export default CustomMetricsTab;