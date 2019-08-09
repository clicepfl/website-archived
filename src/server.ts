/**
 * Main app entry point
 * CLIC website software
 *
 * @file    Main entry point of the server
 * @author  Alexandre CHAU
 */

 import { app } from './index'
 import { config } from './config'

/**
 * Setup logging
 */

// TODO

/**
 * Start express server
 */
app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`)
})