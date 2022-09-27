const express = require('express');
const dashboardRouter = express.Router();
const dashboardController = require('../controllers/dashboardController');

dashboardRouter.get('/mem', dashboardController.getTotalMem, (req, res) => {
    return res.status(200).send(res.locals.totalMem);
})

dashboardRouter.get('/cpu', dashboardController.getTotalCpu, (req, res) => {
    return res.status(200).send(res.locals.totalCpu);
})

module.exports = dashboardRouter;