import cluster from 'cluster';
import { start, end, CustomController, axios, CustomQuery } from '../../types';

const customController: CustomController = {

  customClusterQueries: [],
  customNodeQueries: [],
  customPodQueries: [],

  testCustomRoute: async (req, res, next) => {
    const { query } = req.body;
    try {
      const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}`)
      if (data.data.status === 'success' && data.data.data.result.length) {
        res.locals.valid = true;
      } else {
        res.locals.valid = false;
      }
      // console.log('transmit data:', data.data.data.result);
      return next();
    } catch(err) {
      return next({
        log: `Error in customController.testCustomRoute: ${err}`,
        status: 500,
        message: {err: 'Error occured while testing custom query route'},
      });
    }
  },

  addCustomRoute: async (req, res, next) => {
    try {
      if (res.locals.valid) {
        const { query, name, scope } = req.body;
        let scopedQueries: CustomQuery[] = [];
        if (scope === 'cluster') scopedQueries = customController.customClusterQueries;
        else if (scope === 'node') scopedQueries = customController.customNodeQueries;
        else if (scope === 'pod') scopedQueries = customController.customPodQueries;
        else throw 'Scope parameter must be defined as cluster, node, or pod';
        scopedQueries.push({ query, name })
        res.locals.addedRoute = true;
      } else {
        res.locals.addedRoute = false;
      }
      return next();
    } catch(err) {
      return next({
        log: `Error in customController.addCustomRoute: ${err}`,
        status: 500,
        message: {err: 'Error occured while adding custom query route'},
      });
    }
  },

  getCustomRoutes: async (req, res, next) => {
    try {
      const { scope } = req.query;
      let scopedQueries: CustomQuery[] = [];
      if (scope === 'cluster') scopedQueries = customController.customClusterQueries;
      else if (scope === 'node') scopedQueries = customController.customNodeQueries;
      else if (scope === 'pod') scopedQueries = customController.customPodQueries;
      else throw 'Scope parameter must be defined as cluster, node, or pod';
      // resolve custom queries here
    } catch(err) {
      return next({
        log: `Error in customController.getCustomRoutes: ${err}`,
        status: 500,
        message: {err: 'Error occured while getting custom queries'},
      });
    }
  }
}

module.exports = customController;