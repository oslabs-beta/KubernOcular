import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import colors from '../colors';
import { kubesColors } from '../colors';

const VisualizerTab = () => {
    const [elements, setElements] = useState([]); 

    useEffect(() => {
        fetch('/api/hierarchy')
          .then(response => response.json())
          .then(data => setElements(data))
    },[])

    const styleSheet = [
        {
            selector: 'node',
            style: {
                color: 'white',
                label: 'data(label)'
            }
        },
        {
            selector: "node[type='namespace']",
            style: {
                "border-width": "3px",
                "border-color": "black",
                shape: 'rectangle',
                "background-color": colors.pastel.solid.envy,
            }
        },
        {
            selector: "node[type='pod']",
            style: {
                "border-width": "3px",
                "border-color": "black",
                shape: 'circle',
                "background-color": colors.pastel.solid.polo,
            }
        },
        {
            selector: "node[type='node']",
            style: {
                "border-width": "3px",
                "border-color": "black",
                shape: 'triangle',
                "background-color": kubesColors.blue,
            }
        },
        {
            selector: "node[type='service']",
            style: {
                "border-width": "3px",
                "border-color": "black",
                shape: 'hexagon',
                "background-color": colors.pastel.solid.martini,
            }
        },
        {
            selector: "edge",
            style: {
              width: 3,
              "line-color": colors.pastel.translucent.geyser,
            }
          } 
        //"#AAD8FF"
    ]
    
// namespace: colors.pastel.solid.envy
// service: colors.pastel.solid.martini
// node: kubesColors.blue
// pod: colors.pastel.solid.polo
    return (
        <div id="visualizer-page-container">
            <div>
            <h1>Visualizer</h1>
            <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center" >
                
                <Chip avatar={<Avatar alt="namespace square" src="./namespace.jpg" />} label="Namespaces" variant="outlined" />
                <Chip avatar={<Avatar>M</Avatar>} label="Nodes" variant="outlined"/>
                <Chip avatar={<Avatar>M</Avatar>} label="Pods" variant="outlined"/>
                <Chip
                avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
                label="Services"
                variant="outlined"
                />
            </Stack>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <CytoscapeComponent elements={elements} stylesheet={styleSheet} style={ { width: '100%', height: '65rem', border: 'solid' } }></CytoscapeComponent>
            </div>
        </div>
    )
  }
  
  export default VisualizerTab;