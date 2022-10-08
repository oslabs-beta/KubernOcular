import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

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
                "background-color": 'yellow'
            }
        },
        {
            selector: "node[type='pod']",
            style: {
                "border-width": "3px",
                "border-color": "black",
                shape: 'circle',
                "background-color": 'red',
            }
        },
        {
            selector: "node[type='node']",
            style: {
                "border-width": "3px",
                "border-color": "black",
                shape: 'triangle',
                "background-color": 'green'
            }
        },
        {
            selector: "node[type='service']",
            style: {
                "border-width": "3px",
                "border-color": "black",
                shape: 'hexagon',
                "background-color": 'blue'
            }
        } 
    ]

    return (
        <div>
            <h1>Visualizer Tab</h1>
            <CytoscapeComponent elements={elements} stylesheet={styleSheet} style={ { width: '100%', height: '1080px', border: 'solid' } }></CytoscapeComponent>
        </div>
    )
  }
  
  export default VisualizerTab;