import { express } from '../../types';
import { Request, Response } from 'express';
const dashboardRouter = express.Router();
const dashboardController = require('../controllers/dashboardController');

dashboardRouter.get('/mem', dashboardController.getTotalMem, (req: Request, res: Response) => {
    return res.status(200).send(res.locals.totalMem.data);
});

dashboardRouter.get('/cpu', dashboardController.getTotalCpu, (req: Request, res: Response) => {
    return res.status(200).send(res.locals.totalCpu.data);
});

module.exports = dashboardRouter;