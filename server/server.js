const express = require('express');
const app = express();
const path = require('path');
const dashboardRouter = require('./routers/dashboardRouter');
const clusterRouter = require('./routers/clusterRouter');
const podRouter = require('./routers/podRouter');
// const nodeRouter = require('./routers/nodeRouter');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/dashboard', dashboardRouter);
app.use('/api/cluster', clusterRouter);
app.use('/api/pod', podRouter);
// app.use('/api/node', nodeRouter);



app.use('*', (req, res) => res.status(404).send('404 Page Not Found'));

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(4000, () => console.log('listening on port 4000'));