const podController = {};
const axios = require('axios');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const start = new Date(Date.now() - (1440 * 60000)).toISOString();
const end = new Date(Date.now()).toISOString();

podController.getCpuUsage = (req, res, next) => {
  const { pod } = req.query;
  console.log('pod name: ', pod);
    fetch(`http://localhost:9090/api/v1/query_range?query=rate(container_cpu_usage_seconds_total{pod='${pod}'}[10m])&start=${start}&end=${end}&step=10m`)
    .then(response => response.json())
    .then(data => {
        console.log('cpu usage for', pod, ':', data);
        res.locals.cpuUsage = data;
        return next();
    })
    .catch(err => next({
      log: 'Error in podController.getCpuUsage middleware',
      status: 500,
      message: { err: 'An error occurred' },
    })) 
}

podController.getMemUsage = (req, res, next) => {
  const { pod } = req.query;
  fetch(`http://localhost:9090/api/v1/query_range?query=container_memory_usage_bytes{pod='${pod}'}&start=${start}&end=${end}&step=10m`)
  .then(response => response.json())
  .then(data => {
      console.log('cpu usage for', pod, ':', data);
      res.locals.memUsage = data;
      return next();
  })
  .catch(err => next({
    log: 'Error in podController.getCpuUsage middleware',
    status: 500,
    message: { err: 'An error occurred' },
  })) 
}

podController.getInstantMetrics = async (req, res, next) => {
  // console.log('query data: ', req.query);
  const { namespace } = req.query;
  try{
    const responseMem = await axios.get(`http://localhost:9090/api/v1/query?query=container_memory_usage_bytes{namespace='${namespace}'}`);
    // console.log(responseMem.data.data.result);
    const responseCpu = await axios.get(`http://localhost:9090/api/v1/query?query=rate(container_cpu_usage_seconds_total{namespace='${namespace}'}[2h])`);
    // console.log(responseCpu.data.data.result);
    console.log(res.locals.data);
    res.locals.data = {
      mem: responseMem.data.data.result,
      cpu: responseCpu.data.data.result
    };
    return next();
  } catch(err) {
    return next({
      log: 'Error in podController.getInstantMetrics middleware',
      status: 500,
      message: { err: 'An error occurred' },
    })
  }
}


module.exports = podController;