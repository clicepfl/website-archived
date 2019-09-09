/**
 * Definition of web services ex. HTTP/express server
 * CLIC website software
 *
 * @author  Alexandre CHAU
 */

import express from 'express'
import nunjucks from 'nunjucks'
import minifyHTML from 'express-minify-html-2'
import { logger } from './logger'
import { router } from './router'
import { config } from './config'

/**
 * Web server setup and definitions such as the express server and its
 * related configurations. The express instance should be kept within this
 * class. Any additional web service should be added and ran from this class.
 */
class WebService {
    /** Express app instance */
    private readonly app = express()

    /**
     * Configures and initializes all the previously defined web services
     */
    start() {
        // Express : setup template engine
        nunjucks.configure('src/', { // Mount src/ as root for templates
            autoescape: true,
            express: this.app,
            trimBlocks: true,
            lstripBlocks: true,
            noCache: !config.production, // Do not use cache when in DEBUG mode
        })

        // Express : setup HTML minifier
        this.app.use(minifyHTML({
            override: true,
            exception_url: false,
            htmlMinifier: {
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: false,
                removeEmptyAttributes: true,
                minifyJS: true
            }
        }))

        // Express : mount main router
        this.app.use('/', router)

        // Logger : initialize
        logger.init()

        // Express : start the HTTP server
        this.app.listen(config.port, () => {
            logger.log(`Web server started on port ${config.port} in ${config.production ? 'PRODUCTION' : 'DEBUG'} mode`)
        })
    }
}

/**
 * Export a single instance of the web service
 */
const webService = new WebService()
export { webService }