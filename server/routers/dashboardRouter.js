const express = require('express');
const dashboardRouter = express.Router();
const dashboardController = require('../controllers/dashboardController');


app.get('/mem', dashboardController.getTotalMemory, (req, res) => {
    return res.status(200).send(res.locals.totalMemory);
})













module.exports = metricsRouter;