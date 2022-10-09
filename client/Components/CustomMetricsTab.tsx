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
                <Box sx={{
                    minWidth: 775,
                    minHeight: 725,
                    border: 0.1,
                    borderRadius: '16px',
                    display: "flex",
                    flexDirection: "column",
                    height: 700,
                    overflow: "hidden",
                    overflowY: "scroll"
                    }}>
                    <CustomMetricsForm setUpdateList={setUpdateList} updateList={updateList}/>
                </Box>
                <Box sx={{
                    minHeight: 725,
                    maxHeight: 725,
                    width: "auto",
                    border: 0.1,
                    borderRadius: '16px',
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    }}>
                    <SavedCustomMetrics updateList={updateList} />
                </Box>
            </Stack>
        </div>
    )
  }
  
  export default CustomMetricsTab;