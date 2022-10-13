import { express } from '../../types';
import { Request, Response } from 'express';
import dashboardController from '../controllers/dashboardController';
const dashboardRouter = express.Router();

dashboardRouter.get(
  '/num',
  dashboardController.getNumberOf,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.data);
  }
);

dashboardRouter.get(
  '/general',
  dashboardController.getGeneralClusterInfo,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.data);
  }
);

dashboardRouter.get(
  '/mem',
  dashboardController.getTotalMem,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.totalMem.data);
  }
);

dashboardRouter.get(
  '/cpu',
  dashboardController.getTotalCpu,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.totalCpu.data);
  }
);

dashboardRouter.get(
  '/transmit',
  dashboardController.getTotalTransmit,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.totalTransmit.data);
  }
);

dashboardRouter.get(
  '/receive',
  dashboardController.getTotalReceive,
  (req: Request, res: Response) => {
    return res.status(200).send(res.locals.totalReceive.data);
  }
);

export default dashboardRouter;
