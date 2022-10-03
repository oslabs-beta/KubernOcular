import { ClusterController, k8s } from "../../types";
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const clusterController: ClusterController = {
    
    getNamespaces: (req, res, next) => {
        k8sApi.listNamespace()
        .then((data: any) => {
            const output: string[] = [];
            for (const element of data.body.items) {
                output.push(element.metadata.name);
            }
            res.locals.namespaces = output;
            return next();
        })
        .catch((err: string | null) => next({
            log: 'Error in clusterController.getNamespaces middleware',
            status: 500,
            message: { err: 'An error occurred' },
        })) 
    },

    getPodsByNamespace: (req, res, next) => {
        const { namespace } = req.query;
        k8sApi.listNamespacedPod(namespace)
        .then((data: any) => {
            const output: string[] = [];
            for (const element of data.body.items) {
                output.push(element.metadata.name);
            }
            res.locals.pods = output;
            return next();
        })
        .catch((err: string | null) => next({
            log: `Error in clusterController.getPodsByNamespace middleware: ${err}`,
            status: 500,
            message: { err: 'An error occurred' },
        }))      
    },

    getNodes: (req, res, next) => {
        // const { namespace } = req.query;
        // k8sApi.listNode(namespace)
        k8sApi.listNode()
        .then((data: any) => {
            const output = [];
            for (const element of data.body.items) {
                output.push(element.metadata.name);
            }
            res.locals.nodes = output;
            return next();
        }) 
        .catch((err: string | null) => next({
            log: 'Error in clusterController.getNodes middleware',
            status: 500,
            message: { err: 'An error occurred' },
        }))     
    }
}

module.exports = clusterController;