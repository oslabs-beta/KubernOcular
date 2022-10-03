import { start, end, CustomController, axios } from '../../types';

const customController: CustomController = {

  customQueries: [],

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
        const { query, name, applyToPods, applyToNodes } = req.body;
        customController.customQueries.push({query, name, applyToPods, applyToNodes});
        console.log('new custom queries:', customController.customQueries);
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
  }
}

module.exports = customController;