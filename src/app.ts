/**
 * Express server definition and setup
 * CLIC website software
 *
 * @file    Main entry point of the server
 * @author  Alexandre CHAU
 */

import express from 'express'
import nunjucks from 'nunjucks'
import { router } from './router'
import { config } from './config'

/// Express server instance
const app = express()

/// Setup template engine
nunjucks.configure('src/views/', {
    autoescape: true,
    express: app,
})

/// Mount main router
app.use('/', router)


/**
 * Setup logging
 */
// TODO

/// Instance of this service
const web = {
    run: function () {
        app.listen(config.port, () => {
            console.log(`Server started on port ${config.port}`)
        })
    }
}

/// Exports
export { web }