const express = require('express');
const podRouter = express.Router();
const podController = require('../controllers/podController');

podRouter.get('/cpu', podController.getCpuUsage, (req, res) => {
  return res.status(200).json(res.locals.cpuUsage);
});

podRouter.get('/mem', podController.getMemUsage, (req, res) => {
  return res.status(200).json(res.locals.memUsage);
});

module.exports = podRouter;