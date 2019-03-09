/**
 * Main app entry point
 * CLIC website software
 *
 * @file    Main entry point of the server
 * @author  Alexandre CHAU
 */

import express from 'express'

/**
 * Express server instance
 */
const app = express()

/**
 * General server config
 */
const config = {
    port: 8000
}

/**
 * Default options for sending files
 */
const sendFileDefaultOptions = {
    root: __dirname
}


/**
 * Express routing
 */

// Homepage
app.get('/', (req, res) => {
    res.sendFile('static/index.html', sendFileDefaultOptions)
})
// IC Boost day
app.get(['/icbd', '/icboostday'], (req, res) => {
    res.sendFile('static/icbd.html', sendFileDefaultOptions)
})
// Static assets
app.use(express.static('public/'))
// 404 handle, must be at the end of the routing list !
app.use((req, res, next) => {
    res.sendFile('static/404.html', sendFileDefaultOptions)
})

/**
 * Start express server
 */
app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`)
})