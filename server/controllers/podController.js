const podController = {};
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const start = new Date(Date.now() - (1440 * 60000)).toISOString();
const end = new Date(Date.now()).toISOString();

podController.getCpuUsage = (req, res, next) => {
  const { pod } = req.query;
  console.log('pod name: ', pod);
    fetch(`http://localhost:9090/api/v1/query_range?query=rate(container_cpu_usage_seconds_total[2h]{pod=${pod}})&start=${start}&end=${end}&step=2h`)
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
  fetch(`http://localhost:9090/api/v1/query_range?query=container_memory_usage_bytes{pod=${pod}}&start=${start}&end=${end}&step=2h`)
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


module.exports = podController;