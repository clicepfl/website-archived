/**
 * Main app entry point, run the compiled JS of this file to start the server
 * CLIC website software
 * 
 * @author  Alexandre CHAU
 */

import { webService } from './web'

/** Set name of process */
process.title = "nodeWebServer"

/** Initialize services */
webService.start()