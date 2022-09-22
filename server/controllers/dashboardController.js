const dashboardController = {};
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const start = new Date(Date.now() - (1440 * 60000)).toISOString();
const end = new Date(Date.now()).toISOString();

dashboardController.getTotalMem = (req, res, next) => {
    fetch(`http://localhost:9090/api/v1/query_range?query=sum(container_memory_working_set_bytes)&start=${start}&end=${end}&step=2h`)
    .then(response => response.json())
    .then(data => {
        res.locals.totalMem = data;
        return next();
    })
    .catch(err => next({
        log: 'Error in dashboardController.getTotalMem middleware',
        status: 500,
        message: { err: 'An error occurred' },
    }))  
}

dashboardController.getTotalCpu = (req, res, next) => {
    console.log('we are in the get total cpu');
    fetch(`http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[2h]))&start=${start}&end=${end}&step=2h`)
      .then(response => response.json())
      .then(data => {
          console.log('inside get total cpu query: ', data);
          // console.log((new Date(data.data.result[0].values[0][0] * 1000)));
          // when sending to frontend, multiply all x valus by 1000
          res.locals.totalCpu = data;
          return next();
      })
      .catch(err => next({
          log: 'Error in dashboardController.getTotalCpu middleware',
          status: 500,
          message: { err: 'An error occurred' },
      })) 
}

module.exports = dashboardController;