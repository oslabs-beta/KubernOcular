import { express } from '../../types';
import { Request, Response } from 'express';
import nodeController from '../controllers/nodeController';
const nodeRouter = express.Router();

nodeRouter.get(
  '/receive',
  nodeController.getNetworkReceiveBytes,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.receiveBytes.data);
  }
);

nodeRouter.get(
  '/transmit',
  nodeController.getNetworkTransmitBytes,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.transmitBytes.data);
  }
);

nodeRouter.get(
  '/instant',
  nodeController.getInstantMetrics,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.data);
  }
);

export default nodeRouter;
