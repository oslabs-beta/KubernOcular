import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

const VisualizerTab = () => {
    const [elements, setElements] = useState([]); 

    useEffect(() => {
        fetch('/api/hierarchy')
          .then(response => response.json())
          .then(data => setElements(data))
    },[])

    return (
        <div>
            <h1>Visualizer Tab</h1>
            <CytoscapeComponent elements={elements} style={ { width: '100%', height: '1080px', border: 'solid' } }></CytoscapeComponent>
        </div>
    )
  }
  
  export default VisualizerTab;