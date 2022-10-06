import cluster from 'cluster';
import { start, end, CustomController, axios, CustomQuery } from '../../types';

const customController: CustomController = {

  customClusterQueries: [{query: 'sum(up)', name:'Name for up', yAxisType: ''}], // dummy metrics for testing
  customNodeQueries: [],
  customPodQueries: [],

  testCustomRoute: async (req, res, next) => {
    const { query, scope } = req.body;
    try {
      const data = await axios.get(`http://localhost:9090/api/v1/query?query=${query}`);
      if (scope === 'cluster') {
        if (data.data.status === 'success' && data.data.data.result.length === 1) {
          res.locals.valid = true;
        } else {
          res.locals.valid = false;
        }
      } else if (scope === 'pod') {
        if (data.data.status === 'success' && data.data.data.result.length && data.data.data.result[0].metric.pod) {
          res.locals.valid = true;
        } else {
          res.locals.valid = false;
        }
      } else if (scope === 'node') {
        if (data.data.status === 'success' && data.data.data.result.length && data.data.data.result[0].metric.job === 'node-exporter') {
          res.locals.valid = true;
          req.body.query = `sum(${query})by(instance)`;
        } else {
          res.locals.valid = false;
        }
      } else throw 'Scope parameter must be defined as cluster, node, or pod';
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
        const { query, name, yAxisType, scope } = req.body;
        let scopedQueries: CustomQuery[] = [];
        if (scope === 'cluster') scopedQueries = customController.customClusterQueries;
        else if (scope === 'node') scopedQueries = customController.customNodeQueries;
        else if (scope === 'pod') scopedQueries = customController.customPodQueries;
        else throw 'Scope parameter must be defined as cluster, node, or pod';
        scopedQueries.push({ query, name, yAxisType })
        console.log(`New queries for ${scope}:`, scopedQueries)
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
      const data = scopedQueries.map(async (queryObject) => {
        const { query, name, yAxisType } = queryObject;
        const result = await axios.get(`http://localhost:9090/api/v1/query_range?query=${query}&start=${start}&end=${end}&step=10m`);
        return {
          name,
          yAxisType,
          result: result.data
        }
      });
      res.locals.data = await Promise.all(data);
      return next();
    } catch(err) {
      return next({
        log: `Error in customController.getCustomRoutes: ${err}`,
        status: 500,
        message: {err: 'Error occured while getting custom queries'},
      });
    }
  },

  deleteCustomRoute: async (req, res, next) => {
    try {
      const { scope, id } = req.body;
      let scopedQueries: CustomQuery[] = [];
      if (scope === 'cluster') scopedQueries = customController.customClusterQueries;
      else if (scope === 'node') scopedQueries = customController.customNodeQueries;
      else if (scope === 'pod') scopedQueries = customController.customPodQueries;
      else throw 'Scope parameter must be defined as cluster, node, or pod';
      const initLen = scopedQueries.length;
      res.locals.route = scopedQueries[id];
      scopedQueries.splice(id, 1);
      const currentLen = scopedQueries.length;
      res.locals.deletedRoute = initLen === currentLen ? false : true;
      return next();
    } catch(err) {
      return next({
        log: `Error in customController.deleteCustomRoute: ${err}`,
        status: 500,
        message: {err: 'Error occured while deleting custom query'},
      });
    }
  }
}

module.exports = customController;