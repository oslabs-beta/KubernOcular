import { express } from '../../types';
import { Request, Response } from 'express';
import clusterController from '../controllers/clusterController';
const clusterRouter = express.Router();

clusterRouter.get('/namespaces', clusterController.getNamespaces, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.namespaces);
});

clusterRouter.get('/pods', clusterController.getPodsByNamespace, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.pods);
});

clusterRouter.get('/nodes', clusterController.getNodes, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.nodes);
});

export default clusterRouter;