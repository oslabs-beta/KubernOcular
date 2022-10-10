import { start, end, NodeController, axios } from '../../types';


const nodeController: NodeController = {

    getInstantMetrics: async (req, res, next) => {
        try{
            const responseTransmit = await axios.get(`http://localhost:9090/api/v1/query?query=sum(rate(node_network_transmit_bytes_total[10m]))by(instance)`);
            const responseReceive = await axios.get(`http://localhost:9090/api/v1/query?query=sum(rate(node_network_receive_bytes_total[10m]))by(instance)`);
            res.locals.data = {};
            for (let i = 0; i < responseTransmit.data.data.result.length; i++) {
                res.locals.data[responseTransmit.data.data.result[i].metric.instance.slice(0, -5)] = {
                    transmit: responseTransmit.data.data.result[i].value[1],
                    receive: responseReceive.data.data.result[i].value[1]
                }
            }
            return next();
        } catch(err) {
            return next({
              log: `Error in nodeController.getInstantMetrics middleware: ${err}`,
              status: 500,
              message: { err: 'An error occurred in while getting node instant metrics' },
            })
        }
    },

    getNetworkTransmitBytes: async (req, res, next) => {
        const { nodeIP } = req.query;
        try {
            const data = await axios.get(`http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total{instance='${nodeIP}:9100'}[10m]))&start=${start}&end=${end}&step=10m`)
            res.locals.transmitBytes = data;
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
            return next();
        } catch(err) {
            return next({
                log: `Error in nodeController.getNetworkRecieveBytes: ${err}`,
                status: 500,
                message: {err: 'Error occured while retrieving node recieve bytes data'},
            });
        }
    }

}

module.exports = nodeController;