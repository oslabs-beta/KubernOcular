import React, { useEffect } from 'react'
import CytoscapeComponent from 'react-cytoscapejs';
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);



export default function Network() {
  const elements: [] = [];
  const width = 600;
  const height = 600;
  //get all namespaces
  //make data node for each namespace 
  
  k8sApi.listNamespace()
  .then(data => {
    const output = [];
      for (const element of data.body.items) {
        output.push(element.metadata.name);
      };
      let interval = width / output.length;
      let count = 1;
      for (const namespace of output) {
        elements.push(
          { data: { id: namespace, label: namespace}, position: { x: (interval * count), y: 475 } }
        );
      }
//   { data: { id: 'one', label: 'Node 1' }, position: { x: 120, y: 220 } },
  })


  return (
    <CytoscapeComponent elements={elements} style={ { width: '600px', height: '600px', border: 'solid' } }></CytoscapeComponent>
  )
}


// const elements = [
//   { data: { id: 'one', label: 'Node 1' }, position: { x: 120, y: 220 } },
//   { data: { id: 'two', label: 'Node 2' }, position: { x: 200, y: 420 } },
//   { data: { id: 'three', label: 'Node 3' }, position: { x: 150, y: 300 } },
//   { data: { source: 'one', target: 'two' } },
//   { data: { source: 'three', target: 'one' } },
//   // { data: { source: 'two' , target: ['one', 'three'] } }
// ];