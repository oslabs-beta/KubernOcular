const dashboardController = {};


metricsController.getTotalMemory = (req, res, next) => {
    fetch(`http://localhost:9090/api/v1/query_range?query=sum(rate(container_memory_working_set_bytes[2h]))&start=${start}&end=${end}&step=2h`)
        .then(response => response.json())
        .then(data => {
            console.log('mem sum', data);
            return res.status(200).send(data);
        })
        .catch(err => next({
            log: 'Error in metricsController.getTotalMemory',
            status: 500,
            message: { err: 'An error occurred' },
        }))  
}















module.exports = metricsController;