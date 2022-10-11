import * as React from 'react';
import { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ErrorIcon from '@mui/icons-material/Error';

const CustomMetricsForm: FC<{setUpdateList: Function, updateList: number}> = props => {
  // preserve state of user input for custom metrics
  const {updateList, setUpdateList} = props;
  const [metricName, setMetricName] = React.useState('');
  const [promQuery, setPromQuery] = React.useState('');
  const [yAxisType, setYAxisType] = React.useState('');
  const [scope, setScope] = React.useState('');
  const [validity, setValidity] = React.useState(false);

  // handlers for each portion of input form
  const handleMetricInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMetricName(event.target.value);
  };

  const handleQueryInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromQuery(event.target.value);
  };

  const handleYAxisSelect = (event: SelectChangeEvent) => {
    setYAxisType(event.target.value);
  };

  const handleScopeSelect = (event: SelectChangeEvent) => {
    setScope(event.target.value);
  };

  // upon clicking "add metric", send post request with user input data and increment saved metrics counter by 1 (for other component to recognize increase and in turn, rerender with added metric)
  const handleSubmit = () => {
    fetch('/api/custom/queries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({scope, query: promQuery, yAxisType, name: metricName})
    })
      .then(res => res.json())
      .then(addedQuery => {
        if (addedQuery) {
          setUpdateList(updateList + 1);
        }
        else console.log('Query was not added');
      })
  };

  // check for validity of query upon change in prom query input field and scope select
  React.useEffect(() => {
    fetch('/api/custom/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({scope: scope, query: promQuery})
    })
      .then(res => res.json())
      .then(data => setValidity(data === true ? true : false))
  }, [promQuery, scope]);


  return (
    <div>
      <h2
      style={{ margin: 28 }}
      >
      Create a Custom Metric
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
      {validity === true || promQuery === '' ?
        <Stack
        direction="row"
        >
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 3, width: '75ch' },
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
        {validity && <TaskAltIcon sx={{ mt: 5 }} />}
        </Stack>
        :
        <Stack
        direction="row"
        >
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 3, width: '75ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-error-helper-text"
              label="PromQL Query"
              variant="outlined"
              defaultValue=""
              value={promQuery}
              onChange={handleQueryInput}
              error
              helperText="Incorrect scope or invalid query"
            />
          </div>
        </Box>
        <ErrorIcon sx={{ mt: 5 }} />
        </Stack>
      }
      <Box sx={{ m: 3, width: '15ch' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Unit Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={yAxisType}
            label="Unit Type"
            onChange={handleYAxisSelect}
          >
            <MenuItem value={'percent'}>Percent</MenuItem>
            <MenuItem value={'seconds'}>Seconds</MenuItem>
            <MenuItem value={'gigabytes'}>Gigabytes</MenuItem>
            <MenuItem value={'kilobytes'}>Kilobytes</MenuItem>
            <MenuItem value={'null'}>None</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ m: 3, mt: 6, width: '15ch' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Scope</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={scope}
            label="Unit Type"
            onChange={handleScopeSelect}
          >
            <MenuItem value={'cluster'}>Cluster</MenuItem>
            <MenuItem value={'node'}>Nodes</MenuItem>
            <MenuItem value={'pod'}>Pods</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        disabled={metricName === '' || promQuery === '' || scope === '' || validity === false}
        onClick={() => handleSubmit()}
        sx={{ m: 3, width: '25ch' }}
        >
        Add Metric
      </Button>
    </div>
  )
}

export default CustomMetricsForm;