import { express } from '../../types';
import { Request, Response } from 'express';
const hierarchyRouter = express.Router();
const hierarchyController = require('../controllers/hierarchyController');

hierarchyRouter.get('/', hierarchyController.getElements, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.elements);
})

module.exports = hierarchyRouter;