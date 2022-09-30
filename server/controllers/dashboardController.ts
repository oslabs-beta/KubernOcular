import { DashboardController, start, end, axios } from '../../types';

const dashboardController: DashboardController = {


  getTotalMem: async (req, res, next) => {
    try {
      const data = await axios.get(`http://localhost:9090/api/v1/query_range?query=sum(container_memory_usage_bytes)&start=${start}&end=${end}&step=10m`);

      res.locals.totalMem = data;

      return next();
      
    } catch (err) {
      return next({
        log: `Error in dashboardController.getTotalMem: ${err}`,
        status: 500,
        message: {err: 'Error occured while retrieving dashboard memory data'},
      });
    }
  },

  getTotalCpu: async (req, res, next) => {
    try {
      const data = await axios.get(`http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[10m]))*100&start=${start}&end=${end}&step=10m`);

      res.locals.totalCpu = data;
      return next();
    } catch (err) {
      return next({
        log: `Error in dashboardController.getTotalCpu: ${err}`,
        status: 500,
        message: { err: 'Error occured while retrieving dashboard cpu data' },
      });
    }
  },
};
module.exports = dashboardController;
