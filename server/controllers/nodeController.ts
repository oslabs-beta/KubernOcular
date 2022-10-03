import { start, end, NodeController, axios } from '../../types';


const nodeController: NodeController = {

    getInstantNetworkTransmitBytes: (req, res, next) => {
        const { node } = req.query;
        //node_network_transmit_bytes_total
        // fetch(`http://localhost:9090/api/v1/query`)
<<<<<<< HEAD
        return next();
=======
>>>>>>> dev
    },

    getInstantNetworkReceiveBytes: (req, res, next) => {
        const { node } = req.query;
        //node_network_receive_bytes_total
        // fetch(`http://localhost:9090/api/v1/query`)
<<<<<<< HEAD
        return next();
    },

    getNetworkTransmitBytes: async (req, res, next) => {
        const { nodeIP } = req.query;
        try {
            const data = await axios.get(`http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total{instance='${nodeIP}:9100'}[10m]))&start=${start}&end=${end}&step=10m`)
            res.locals.transmitBytes = data;
            // console.log('transmit data:', data.data.data.result);
            return next();
        } catch(err) {
            return next({
                log: `Error in nodeController.getNetworkTransmitBytes: ${err}`,
                status: 500,
                message: {err: 'Error occured while retrieving node transmit bytes data'},
            });
        }
    },

    getNetworkReceiveBytes: async (req, res, next) => {
        const { nodeIP } = req.query;
        try {
            const data = await axios.get(`http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_receive_bytes_total{instance='${nodeIP}:9100'}[10m]))&start=${start}&end=${end}&step=10m`)
            res.locals.receiveBytes = data;
            // console.log('receive data:', data.data.data.result);
            return next();
        } catch(err) {
            return next({
                log: `Error in nodeController.getNetworkRecieveBytes: ${err}`,
                status: 500,
                message: {err: 'Error occured while retrieving node recieve bytes data'},
            });
        }
=======
>>>>>>> dev
    }

}

module.exports = nodeController;