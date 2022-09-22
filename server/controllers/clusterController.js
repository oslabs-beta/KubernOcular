const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const clusterController = {};

clusterController.getNamespaces = (req, res, next) => {
    k8sApi.listNamespace()
        .then(data => {
            const output = [];
            for (const element of data.body.items) {
                output.push(element.metadata.name);
            }
            res.locals.namespaces = output;
            return next();
        })
        .catch(err => next({
            log: 'Error in clusterController.getNamespaces middleware',
            status: 500,
            message: { err: 'An error occurred' },
        })) 
};

clusterController.getPodsByNamespace = (req, res, next) => {
    const { namespace } = req.query;
    k8sApi.listNamespacedPod(namespace)
        .then(data => {
            const output = [];
            for (const element of data.body.items) {
                output.push(element.metadata.name);
            }
            res.locals.pods = output;
            return next();
        })
        .catch(err => next({
            log: 'Error in clusterController.getPodsByNamespace middleware',
            status: 500,
            message: { err: 'An error occurred' },
        }))      
};

clusterController.getNodesByNamespace = (req, res, next) => {
    const { namespace } = req.query;
    k8sApi.listNode(namespace)
      .then(data => {
        const output = [];
        for (const element of data.body.items) {
            output.push(element.metadata.name);
        }
        res.locals.nodes = output;
        return next();
      }) 
      .catch(err => next({
        log: 'Error in clusterController.getNodesByNamespace middleware',
        status: 500,
        message: { err: 'An error occurred' },
      }))     
};


module.exports = clusterController;