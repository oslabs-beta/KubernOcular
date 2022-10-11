import { express } from '../../types';
import { Request, Response } from 'express';
import hierarchyController from '../controllers/hierarchyController';
const hierarchyRouter = express.Router();

hierarchyRouter.get('/', hierarchyController.getElements, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.elements);
})

export default hierarchyRouter;