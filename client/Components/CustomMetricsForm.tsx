import * as React from 'react';
import { FC } from 'react';
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const CustomMetricsForm: FC = () => {
  const [metricName, setMetricName] = React.useState('');
  const [promQuery, setPromQuery] = React.useState('');
  const [yAxisType, setYAxisType] = React.useState('');
  const [scope, setScope] = React.useState('');
  const [valid, setValid] = React.useState(false);

  const handleMetricInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('metric name: ', event.target.value);
    setMetricName(event.target.value);
  };

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('your prom query: ', event.target.value);
    setPromQuery(event.target.value);
  };

  const handleYAxisSelect = (event: SelectChangeEvent) => {
    console.log('y axis unit: ', event.target.value);
    setYAxisType(event.target.value);
  };

  const handleScopeSelect = (event: SelectChangeEvent) => {
    console.log('scope: ', event.target.value);
    setScope(event.target.value);
  };

  // unclear on event type
  const handleSubmit = (event: any) => {
    return console.log('hi');
  };

  return (
    <div>
      <h2
      style={{ margin: 25 }}
      >
      Custom Metrics Form
      </h2>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 3, width: '65ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-required"
            label="Metric Name"
            variant="outlined"
            defaultValue=""
            value={metricName}
            onChange={handleMetricInput}
          />
        </div>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 3, width: '65ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-required"
            label="PromQL Query"
            variant="outlined"
            defaultValue=""
            value={promQuery}
            onChange={handleQueryInput}
          />
        </div>
      </Box>
      <Box sx={{ m: 3, width: '25ch' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Unit Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={yAxisType}
            label="Unit Type"
            onChange={handleYAxisSelect}
          >
            <MenuItem value={'Percent'}>Percent</MenuItem>
            <MenuItem value={'Gigabytes'}>Gigabytes</MenuItem>
            <MenuItem value={'Kilobytes'}>Kilobytes</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ m: 3, width: '25ch' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Scope</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={scope}
            label="Unit Type"
            onChange={handleScopeSelect}
          >
            <MenuItem value={'Cluster'}>Cluster</MenuItem>
            <MenuItem value={'Nodes'}>Nodes</MenuItem>
            <MenuItem value={'Pods'}>Pods</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        disabled={metricName === '' || promQuery === '' || yAxisType === '' || scope === ''}
        onClick={() => handleSubmit(event)}
        sx={{ m: 3, width: '25ch' }}
        >
        Submit Query
      </Button>
    </div>
  )
}

// form
// metric name: text field
// prom query: text field
// y axis type: select (percent, GB, KB)
// scope: select (cluster, node, pod)
// submit: button (all fields required to enable)

// fill out form
// submit enabled
// on submit, send this query to the backend
  // clear out forms if valid, success snackbar
    // send full state info to backend
  // leave filled out forms if invalid, error snackbar, highlight query input field red

export default CustomMetricsForm;