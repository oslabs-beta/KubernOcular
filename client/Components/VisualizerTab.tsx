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
                "background-color": kubesColors.purple,
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
              "line-color": colors.translucent.currentLine,
            }
          } 
        //"#AAD8FF"
    ]
    
// namespace: colors.pastel.solid.envy
// service: colors.pastel.solid.martini
// node: kubesColors.blue
// pod: colors.pastel.solid.polo

{/* <Stack direction="row" spacing={1}>
      <Chip avatar={<Avatar>M</Avatar>} label="Avatar" />
      <Chip
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Avatar"
        variant="outlined"
      />
    </Stack> */}

    return (
        <div id="visualizer-page-container">
            <div>
            <Stack direction="row" spacing={1} justifyContent="flex-end" alignItems="center" sx={{ mb: 3 }}>
                <Chip
                avatar={<Avatar src="https://hmp.me/dyjo" />}
                label="Nodes"
                variant="outlined"
                style={{ color: kubesColors.purple, borderColor: kubesColors.purple }}
                />
                <Chip
                avatar={<Avatar src="https://hmp.me/dyjn" />}
                label="Namespaces"
                variant="outlined"
                style={{ color: colors.pastel.solid.envy, borderColor: colors.pastel.solid.envy }}
                />
                <Chip
                avatar={<Avatar src="https://hmp.me/dyjh" />}
                label="Pods"
                variant="outlined"
                style={{ color: colors.pastel.solid.polo, borderColor: colors.pastel.solid.polo }}
                />
                <Chip
                avatar={<Avatar src="https://hmp.me/dyjg" />}
                label="Services"
                variant="outlined"
                style={{ color: colors.pastel.solid.martini, borderColor: colors.pastel.solid.martini }}
                />
            </Stack>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <CytoscapeComponent elements={elements} stylesheet={styleSheet} style={{ width: '100%', height: '65rem', border: 'solid' }}></CytoscapeComponent>
            </div>
        </div>
    )
  }
  
  export default VisualizerTab;