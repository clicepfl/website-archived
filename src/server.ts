/**
 * Main app entry point, run the compiled JS of this file to start the server
 * CLIC website software
 * 
 * @author  Alexandre CHAU
 */

import { webService } from './web';

process.on('SIGINT', () => {
    console.log('Received SIGINT signal. Gracefully shutting down...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal. Gracefully shutting down...');
    process.exit(0);
});

/** Set name of process */
process.title = "nodeWebServer"

/** Initialize services */
webService.start()