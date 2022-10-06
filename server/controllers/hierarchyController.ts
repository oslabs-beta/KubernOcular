import { HierarchyController, Elements, k8s } from '../../types';
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sApi1 = kc.makeApiClient(k8s.AppsV1Api);

const hierarchyController: HierarchyController = {
    getElements: async (req, res, next) => {
      try {
        const elements: Elements[] = [];
      
        const namespaceData = await k8sApi.listNamespace();
      
        let distance = 1280/(namespaceData.body.items.length + 1);
        let multiplier = 1;
      
        const namespaces: string[] = [];
        namespaceData.body.items.forEach((space: any) => {
          const name = space.metadata.name;
          if (name !== 'kube-system') namespaces.push(name);
          elements.push({ data: { id: name, label: name }, position: { x: (distance * multiplier),  y: 600 } });
          multiplier++;
        });
        
        const len = await k8sApi.listPodForAllNamespaces();
        distance = 1280/(len.body.items.length + 1);
        multiplier = 1;
        let alter = false;
        
        const nodeSet = new Set();
        const srvSet = new Set();
        const deplSet = new Set();
      
        for (const namespace of namespaces) {
          const podData = await k8sApi.listNamespacedPod(namespace)
          // eslint-disable-next-line no-loop-func
          podData.body.items.forEach((pod: any) => {
            const yVal = alter ? 350 : 500;
            const name = pod.metadata.name;
            elements.push(
              { data: { id: name, label: name }, position: { x: (distance * multiplier), y: yVal } }
            );
            multiplier++;
            elements.push(
              { data: { source: name, target: namespace } }
            )
            alter = alter ? false : true;
          })
      
      
          const nodeData = await k8sApi.listNode(namespace);
          const lenNode = await k8sApi.listNode();
          distance = 1280/(lenNode.body.items.length + 1)
          multiplier = 1;
          // eslint-disable-next-line no-loop-func
          nodeData.body.items.forEach((node: any) => {
            const yVal = alter ? 775 : 927;
            const name = node.metadata.name;
            if (!nodeSet.has(name)) {
              elements.push(
                { data: { id: name, label: name }, position: { x: (distance * multiplier), y: yVal } }
              )
              multiplier++;
              nodeSet.add(name);
            }
            elements.push(
              { data: { source: name, target: namespace } }
            )
            alter = alter ? false : true;
          })
      
          const lenSrv = await k8sApi.listServiceForAllNamespaces()
          distance = 1280/(lenSrv.body.items.length + 1);
          
          const serviceData = await k8sApi.listNamespacedService(namespace)
          // eslint-disable-next-line no-loop-func
          serviceData.body.items.forEach((service: any) => {
            const yVal = alter ? 150 : 375;
            const name = service.metadata.name
            if (!srvSet.has(name)) {
              elements.push(
                { data: { id: name, label: name }, position: { x: (distance * multiplier), y: yVal}}
              )
              multiplier++;
              srvSet.add(name);
            }
            elements.push(
              { data: { source: name, target: namespace } }
            )
            alter = alter ? false : true;
          });
      
      
          const lenDep = await k8sApi1.listDeploymentForAllNamespaces()
          distance = 1280/(lenDep.body.items.length + 1);
          multiplier = 1;
      
          const deployData = await k8sApi1.listNamespacedDeployment(namespace)
          // eslint-disable-next-line no-loop-func
          deployData.body.items.forEach((deploy: any) => {
            const yVal = alter ? 1300 : 1150;
            const name = deploy.metadata.name;
            if (!deplSet.has(name)) {
              elements.push(
                { data: { id: name, label: name }, position: { x: (distance * multiplier), y: yVal } }
              );
              multiplier++;
              deplSet.add(name);
            };
            elements.push(
              { data: { source: name, target: namespace } }
            )
            alter = alter ? false : true;
      
          })
      
        };
      
        res.locals.elements = elements;
        return next();
      } catch(err) {
        return next({
            log: `Error in hierarchyController.getElements: ${err}`,
            status: 500,
            message: {err: 'Error occured while retrieving network elements in hierarchyController'},
          });
      }
    }
}

module.exports = hierarchyController;