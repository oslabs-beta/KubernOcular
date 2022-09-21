const express = require('express');
const { append } = require('express/lib/response');
const clusterRouter = express.Router();
const clusterController = require('../controllers/clusterController');

app.get('/namespaces', clusterController.getNamespace, (req, res) => {
  return res.status(200).json(res.locals.namespaces);
})

app.get('/pods', clusterController.getPodsByNamespace, (req, res) => {
  return res.status(200).json(res.locals.pods);
})

app.get('/nodes', clusterController.getNodesByNamespace, (req, res) => {
  return res.status(200).json(res.locals.nodes);
})
















module.exports = clusterRouter;