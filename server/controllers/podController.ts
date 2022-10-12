import { start, end, PodController, axios } from '../../types';

const podController: PodController = {
  getCpuUsage: async (req, res, next) => {
    const { pod } = req.query;
    try {
      const data = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=rate(container_cpu_usage_seconds_total{pod='${pod}'}[10m])*100&start=${start}&end=${end}&step=10m`
      );
      res.locals.cpuUsage = data;
      return next();
    } catch (err) {
      return next({
        log: `Error in podController.getCpuUsage: ${err}`,
        status: 500,
        message: {
          err: 'Error occured while retrieving pod cpu usage data',
        },
      });
    }
  },

  getMemUsage: async (req, res, next) => {
    const { pod } = req.query;
    try {
      const data = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=container_memory_usage_bytes{pod='${pod}'}&start=${start}&end=${end}&step=10m`
      );
      res.locals.memUsage = data;
      return next();
    } catch (err) {
      return next({
        log: `Error in podController.getMemUsage: ${err}`,
        status: 500,
        message: {
          err: 'Error occured while retrieving pod memory usage data',
        },
      });
    }
  },

  getInstantMetrics: async (req, res, next) => {
    const { namespace } = req.query;
    try {
      const responseMem = await axios.get(
        `http://localhost:9090/api/v1/query?query=container_memory_usage_bytes{namespace='${namespace}'}`
      );
      const responseCpu = await axios.get(
        `http://localhost:9090/api/v1/query?query=rate(container_cpu_usage_seconds_total{namespace='${namespace}'}[2h])`
      );
      res.locals.data = {
        mem: responseMem.data.data.result,
        cpu: responseCpu.data.data.result,
      };
      return next();
    } catch (err) {
      return next({
        log: 'Error in podController.getInstantMetrics middleware',
        status: 500,
        message: { err: 'An error occurred' },
      });
    }
  },
};

export default podController;
