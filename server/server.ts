import { ErrObject, express } from '../types';
import { Request, Response, NextFunction }  from 'express';
const app = express();
const cors = require('cors');
const dashboardRouter = require('./routers/dashboardRouter');
const clusterRouter = require('./routers/clusterRouter');
const podRouter = require('./routers/podRouter');
const nodeRouter = require('./routers/nodeRouter');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/dashboard', dashboardRouter);
app.use('/api/cluster', clusterRouter);
app.use('/api/pod', podRouter);
app.use('/api/node', nodeRouter);

app.use('*', (req: Request, res: Response) => res.status(404).send('404 Page Not Found'));

app.use((err: ErrObject, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(3000, () => console.log('listening on port 3000'));