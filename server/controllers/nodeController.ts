import { start, end, NodeController, fetch, axios } from '../../types';


const nodeController: NodeController = {

    getInstantNetworkTransmitBytes: (req, res, next) => {
        const { node } = req.query;
        //node_network_transmit_bytes_total
        fetch(`http://localhost:9090/api/v1/query`)
    },

    getInstantNetworkRecievedBytes: (req, res, next) => {
        const { node } = req.query;
        //node_network_receive_bytes_total
        fetch(`http://localhost:9090/api/v1/query`)
    }

}

module.exports = nodeController;