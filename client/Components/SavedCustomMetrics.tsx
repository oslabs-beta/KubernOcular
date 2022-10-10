import * as React from 'react';
import { FC, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SavedCustomMetrics: FC<{updateList: number}> = props => {
  const { updateList } = props;
  const defaultMetricNames: string[] = [];
  const defaultActive: number[] = [];
  const [scope, setScope] = useState('cluster');
  const [metricNames, setMetricNames] = useState(defaultMetricNames);
  const [active, setActive] = useState(defaultActive);

  const handleBoxChange = (event: SelectChangeEvent) => {
    setScope(event.target.value as string);
  };

  const resetMetricDisplay = () => {
    fetch(`/api/custom/list?scope=${scope}`)
      .then(res => res.json())
      .then(data => {
        const newMetricNames: string[] = [];
        const newActive: number[] = [];
        for (let i = 0; i < data.length; i++) {
          newMetricNames.push(data[i].name);
          if(data[i].active) newActive.push(i);
        }
        setMetricNames(newMetricNames);
        setActive(newActive);
      })
  }

  useEffect(resetMetricDisplay, [scope, updateList])

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
      body: JSON.stringify({scope, id: index, active: !active.includes(index)})
    })

    if (didChangeActive.status === 200) {
      resetMetricDisplay();
    }
  }

  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <h2
      style={{ margin: 25 }}
      >
      Saved Metrics
      </h2>
      <Box sx={{ m: 3, mt: 6, width: '80ch' }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Scope</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={scope}
            label="Scope"
            onChange={handleBoxChange}
          >
            <MenuItem value={'cluster'}>Cluster</MenuItem>
            <MenuItem value={'node'}>Node</MenuItem>
            <MenuItem value={'pod'}>Pod</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <List sx={{ width: '100%', ml: 1.2, maxWidth: 735, bgcolor: 'background.paper', variant: "outlined"}}>
      {metricNames.map((name, index) => {
        const labelId = `checkbox-list-label-${index}`;
        return (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="comments" onClick={() => handleDelete(index)}>
                <HighlightOffIcon /> 
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={() => handleChange(index)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={active.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={name} />
            </ListItemButton>
          </ListItem>
        );
      })}
      </List>
    </div>
  )
}

export default SavedCustomMetrics;