import { ErrObject, express } from '../types';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dashboardRouter from './routers/dashboardRouter';
import clusterRouter from './routers/clusterRouter';
import podRouter from './routers/podRouter';
import nodeRouter from './routers/nodeRouter';
import customRouter from './routers/customRouter';
import hierarchyRouter from './routers/hierarchyRouter';
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/dashboard', dashboardRouter);
app.use('/api/cluster', clusterRouter);
app.use('/api/pod', podRouter);
app.use('/api/node', nodeRouter);
app.use('/api/custom', customRouter);
app.use('/api/hierarchy', hierarchyRouter);

app.use('*', (req: Request, res: Response) =>
  res.status(404).send('404 Page Not Found')
);

app.use((err: ErrObject, req: Request, res: Response) => {
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

export default app;
