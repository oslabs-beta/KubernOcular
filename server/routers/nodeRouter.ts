import { express } from '../../types';
import { Request, Response } from 'express';
const nodeRouter = express.Router();
const nodeController = require('../controllers/nodeController');

nodeRouter.get('/receive', nodeController.getNetworkReceiveBytes, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.receiveBytes.data);
})

nodeRouter.get('/transmit', nodeController.getNetworkTransmitBytes, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.transmitBytes.data);
})

nodeRouter.get('/instant', nodeController.getInstantMetrics, (req: Request, res: Response) => {
  return res.status(200).json(res.locals.data);
})

module.exports = nodeRouter;