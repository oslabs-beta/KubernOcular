const nodeController = {};

const start = new Date(Date.now() - (1440 * 60000)).toISOString();
const end = new Date(Date.now()).toISOString();

//instant metrics
nodeController.getInstantNetworkTransmitBytes = (req, res, next) => {
    const { node } = req.query;
    //node_network_transmit_bytes_total
    fetch(`http://localhost:9090/api/v1/query`)
}

nodeController.getInstantNetworkRecievedBytes = (req, res, next) => {
    const { node } = req.query;
    //node_network_receive_bytes_total
    fetch(`http://localhost:9090/api/v1/query`)
}

module.exports = nodeController;