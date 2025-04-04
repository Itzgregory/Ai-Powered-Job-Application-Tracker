const { app, server } = require('./server'); 
const getConnections = require('../../config/db/connection');
const { logger, logerror } = require('../helpers/logger');
const { variables: { PORT } } = require('../../config');
const webSocketService = require('./sockeIo'); 

const startServer = async () => {
    try {
        const message = await getConnections();
        logger.info(message);

        server.listen(PORT || 9000, () => {
            logger.info(`Server is listening on port ${PORT}`);
        });

        webSocketService.initializeWebSocket(server);

        server.on('error', (err) => {
            logerror.error(`Server error: ${err}`);
            process.exit(1);
        });

    } catch (error) {
        logerror.error(`Failed to start server: ${error}`);
        process.exit(1);
    }
};

startServer();
