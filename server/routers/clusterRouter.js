const express = require('express');
const { append } = require('express/lib/response');
const clusterRouter = express.Router();
const clusterController = require('../controllers/clusterController');

clusterRouter.get('/namespaces', clusterController.getNamespaces, (req, res) => {
  return res.status(200).json(res.locals.namespaces);
})

clusterRouter.get('/pods', clusterController.getPodsByNamespace, (req, res) => {
  return res.status(200).json(res.locals.pods);
})

clusterRouter.get('/nodes', clusterController.getNodes, (req, res) => {
  return res.status(200).json(res.locals.nodes);
})
















module.exports = clusterRouter;