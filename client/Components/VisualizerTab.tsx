import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import colors from '../colors';

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
                "background-color": colors.solid.yellow,
            }
        },
        {
            selector: "node[type='pod']",
            style: {
                "border-width": "3px",
                "border-color": "black",
                shape: 'circle',
                "background-color": colors.solid.pink,
            }
        },
        {
            selector: "node[type='node']",
            style: {
                "border-width": "3px",
                "border-color": "black",
                shape: 'triangle',
                "background-color": colors.solid.green,
            }
        },
        {
            selector: "node[type='service']",
            style: {
                "border-width": "3px",
                "border-color": "black",
                shape: 'hexagon',
                "background-color": colors.solid.cyan,
            }
        },
        {
            selector: "edge",
            style: {
              width: 3,
              "line-color": colors.solid.comment,
            }
          } 
        //"#AAD8FF"
    ]

    return (
        <div id="visualizer-page-container">
            <div id="visualizer-legend">
                <div className='legend-item' id='services'>
                    <h2 className ='legend-header'>Services</h2> 
                    <div className='shape'>x</div>
                </div>
                <div className='legend-item' id='pods'>
                    <h2 className ='legend-header'>Pods</h2> 
                    <div className='shape'>y</div>
                </div>
                <div className='legend-item' id='namespaces'>
                    <h2 className ='legend-header'>Namespaces</h2> 
                    <div className='shape'>z</div>
                </div>
                <div className='legend-item' id='nodes'>
                    <h2 className ='legend-header'>Nodes</h2> 
                    <div className='shape'>a</div>
                </div>
            </div>
            <CytoscapeComponent elements={elements} stylesheet={styleSheet} style={ { width: '100%', height: '1080px', border: 'solid' } }></CytoscapeComponent>
        </div>
    )
  }
  
  export default VisualizerTab;